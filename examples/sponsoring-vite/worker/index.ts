import { env } from 'cloudflare:workers'
import { Route, Router } from 'porto/server'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as Contracts from '../src/contracts.ts'

const relayTransport = env.MERCHANT_RELAY_URL
  ? http(env.MERCHANT_RELAY_URL)
  : undefined

const router = Router({ basePath: '/porto' })

let onboardQueue = Promise.resolve()
async function withOnboardLock<T>(fn: () => Promise<T>): Promise<T> {
  const prev = onboardQueue
  let release: (() => void) | undefined
  onboardQueue = new Promise<void>((resolve) => {
    release = resolve
  })
  await prev
  try {
    return await fn()
  } finally {
    release?.()
  }
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForNoPendingTxs(params: {
  publicClient: ReturnType<typeof createPublicClient>
  address: `0x${string}`
  timeoutMs: number
}) {
  const { publicClient, address, timeoutMs } = params
  const deadlineMs = Date.now() + timeoutMs
  while (Date.now() < deadlineMs) {
    const [latest, pending] = await Promise.all([
      publicClient.getTransactionCount({ address, blockTag: 'latest' }),
      publicClient.getTransactionCount({ address, blockTag: 'pending' }),
    ])
    if (pending <= latest) return
    await sleep(500)
  }
  throw new Error('merchant has pending txs; try again')
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

router.route(
  '/merchant',
  Route.merchant({
    address: env.MERCHANT_ADDRESS,
    key: env.MERCHANT_PRIVATE_KEY,
    ...(relayTransport ? { relay: relayTransport } : {}),
    sponsor(request) {
      const exp1 = Contracts.exp1Address.toLowerCase()
      return request.calls.every((call) => call.to.toLowerCase() === exp1)
    },
  }),
)

router.hono.post('/onboard', async (c) => {
  const rpcUrl = env.GWYNETH_RPC_URL ?? 'http://localhost:32002'
  const relayUrl = env.MERCHANT_RELAY_URL
  if (!relayUrl) return c.json({ error: 'MERCHANT_RELAY_URL is not set' }, 500)

  const body = (await c.req.json().catch(() => null)) as {
    address?: string | undefined
    gas?: number | undefined
  } | null

  const address = body?.address
  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return c.json({ error: 'invalid address' }, 400)
  }

  try {
    return await withOnboardLock(async () => {
      const publicClient = createPublicClient({ transport: http(rpcUrl) })

      const codeBefore = await publicClient.getCode({ address })
      if (codeBefore?.startsWith('0xef0100')) {
        return c.json({ alreadyDelegated: true, code: codeBefore, ok: true })
      }

      const merchant = privateKeyToAccount(env.MERCHANT_PRIVATE_KEY)

      // Delegated (7702) accounts are restricted by reth txpool to a single in-flight executable
      // transaction. Serialize onboard requests and wait for the merchant to clear its pending tx
      // before attempting another onboarding tx.
      await waitForNoPendingTxs({
        address: merchant.address,
        publicClient,
        timeoutMs: 30_000,
      })

      const relayResp = await fetch(relayUrl, {
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'wallet_getAuthorization',
          params: [{ address }],
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      })
      const relayJson = (await relayResp.json()) as any
      if (relayJson?.error) {
        return c.json(
          {
            error:
              relayJson.error?.message ??
              'relay wallet_getAuthorization failed',
          },
          502,
        )
      }

      const authorization = relayJson?.result?.authorization
      const to = relayJson?.result?.to
      const data = relayJson?.result?.data
      if (!authorization || !to || !data) {
        return c.json(
          { error: 'relay returned empty authorization tx fields' },
          502,
        )
      }

      const walletClient = createWalletClient({
        account: merchant,
        transport: http(rpcUrl),
      })

      const gas = BigInt(body?.gas ?? 5_000_000)
      const authorizationList = [
        {
          address: authorization.address,
          chainId: Number(authorization.chainId),
          nonce: Number(authorization.nonce),
          r: authorization.r,
          s: authorization.s,
          yParity: Number(authorization.yParity),
        },
      ]

      let hash: `0x${string}`
      try {
        hash = await walletClient.sendTransaction({
          authorizationList,
          data,
          gas,
          maxFeePerGas: 1_000_000_000n,
          maxPriorityFeePerGas: 1_000_000_000n,
          to,
          value: 0n,
        })
      } catch (error) {
        const message = formatError(error)
        if (
          message.includes(
            'in-flight transaction limit reached for delegated accounts',
          )
        ) {
          await waitForNoPendingTxs({
            address: merchant.address,
            publicClient,
            timeoutMs: 30_000,
          })
          hash = await walletClient.sendTransaction({
            authorizationList,
            data,
            gas,
            maxFeePerGas: 1_000_000_000n,
            maxPriorityFeePerGas: 1_000_000_000n,
            to,
            value: 0n,
          })
        } else {
          throw error
        }
      }

      const receipt = await publicClient
        .waitForTransactionReceipt({ hash, timeout: 30_000 })
        .catch(() => null)

      // Even if we time out waiting for the receipt, poll briefly for code visibility so the UI
      // doesn't prompt the user to click Onboard again.
      const deadlineMs = Date.now() + 30_000
      let codeAfter = await publicClient.getCode({ address })
      while (
        (!codeAfter || codeAfter === '0x') &&
        Date.now() < deadlineMs &&
        (receipt?.status === 'success' || receipt === null)
      ) {
        await sleep(500)
        codeAfter = await publicClient.getCode({ address })
      }

      return c.json({
        code: codeAfter,
        hash,
        ok: true,
        status: receipt?.status ?? 'unknown',
      })
    })
  } catch (error) {
    return c.json({ error: formatError(error) }, 500)
  }
})

export default router satisfies ExportedHandler<Env>
