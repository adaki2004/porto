import { env } from 'cloudflare:workers'
import { Route, Router } from 'porto/server'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as Contracts from '../src/contracts.ts'

const relayTransport = env.MERCHANT_RELAY_URL
  ? http(env.MERCHANT_RELAY_URL)
  : undefined

const router = Router({ basePath: '/porto' })

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

  const publicClient = createPublicClient({ transport: http(rpcUrl) })
  const codeBefore = await publicClient.getCode({ address })
  if (codeBefore?.startsWith('0xef0100')) {
    return c.json({ ok: true, alreadyDelegated: true, code: codeBefore })
  }

  const relayResp = await fetch(relayUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'wallet_getAuthorization',
      params: [{ address }],
    }),
  })
  const relayJson = (await relayResp.json()) as any
  if (relayJson?.error) {
    return c.json(
      { error: relayJson.error?.message ?? 'relay wallet_getAuthorization failed' },
      502,
    )
  }

  const authorization = relayJson?.result?.authorization
  const to = relayJson?.result?.to
  const data = relayJson?.result?.data
  if (!authorization || !to || !data) {
    return c.json({ error: 'relay returned empty authorization tx fields' }, 502)
  }

  const merchant = privateKeyToAccount(env.MERCHANT_PRIVATE_KEY)
  const walletClient = createWalletClient({
    account: merchant,
    transport: http(rpcUrl),
  })

  const gas = BigInt(body?.gas ?? 5_000_000)
  const authorizationList = [
    {
      chainId: Number(authorization.chainId),
      address: authorization.address,
      nonce: Number(authorization.nonce),
      r: authorization.r,
      s: authorization.s,
      yParity: Number(authorization.yParity),
    },
  ]

  const hash = await walletClient.sendTransaction({
    authorizationList,
    to,
    data,
    value: 0n,
    gas,
    maxFeePerGas: 1_000_000_000n,
    maxPriorityFeePerGas: 1_000_000_000n,
  })

  const receipt = await publicClient
    .waitForTransactionReceipt({ hash, timeout: 20_000 })
    .catch(() => null)
  const codeAfter = await publicClient.getCode({ address })

  return c.json({
    ok: true,
    hash,
    status: receipt?.status ?? 'unknown',
    code: codeAfter,
  })
})

export default router satisfies ExportedHandler<Env>
