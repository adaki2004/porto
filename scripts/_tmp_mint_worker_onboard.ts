import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as dotenv from 'dotenv'
import { encodeFunctionData, http, parseEther } from 'viem'
import { createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import * as Secp256k1 from 'ox/Secp256k1'
import * as Signature from 'ox/Signature'
import * as TypedData from 'ox/TypedData'

import * as Key from '../src/viem/Key.js'
import * as ExperimentERC20 from '../src/core/internal/_generated/contracts/ExperimentERC20.js'

type GwAddresses = {
  chainId: number
  rpcUrl?: string
  contracts: {
    accountProxy: `0x${string}`
  }
  demoTokens: {
    exp1: `0x${string}`
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.gwyneth') })
const sponsoringEnvPath = resolve(__dirname, '../examples/sponsoring-vite/.env')
if (existsSync(sponsoringEnvPath)) dotenv.config({ path: sponsoringEnvPath })

const relayUrl = process.env.PORTO_RELAY_URL ?? 'http://localhost:9119'
const rpcUrl = process.env.PORTO_RPC_URL ?? 'http://localhost:32002'
const routerUrl = process.env.PORTO_ROUTER_URL ?? 'http://localhost:32005'
const uiUrl = process.env.PORTO_UI_URL ?? 'http://localhost:5179'

const addressesPath =
  process.env.PORTO_ADDRESSES_PATH ??
  resolve(__dirname, '../config/gwyneth-addresses.json')
const addresses = JSON.parse(
  readFileSync(addressesPath, 'utf-8'),
) as GwAddresses

const chainId = addresses.chainId ?? 160010
const exp1Address = addresses.demoTokens.exp1
const delegationProxy = addresses.contracts.accountProxy

const feePayer = (process.env.MERCHANT_ADDRESS ?? '') as `0x${string}`
const feePayerKey = (process.env.MERCHANT_PRIVATE_KEY ?? '') as `0x${string}`

function padAddressToBytes32(address: `0x${string}`): `0x${string}` {
  return `0x${'0'.repeat(24)}${address.slice(2).toLowerCase()}` as `0x${string}`
}

async function rpc(method: string, params: unknown[]) {
  const res = await fetch(relayUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  const json = await res.json()
  if (json.error)
    throw new Error(`${method} failed: ${JSON.stringify(json.error)}`)
  return json.result
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function routerRpc(method: string, params: unknown[]) {
  const res = await fetch(routerUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  const json = await res.json()
  if (json.error)
    throw new Error(`${method} failed: ${JSON.stringify(json.error)}`)
  return json.result
}

async function main() {
  if (!feePayer || !feePayerKey)
    throw new Error('MERCHANT_ADDRESS and MERCHANT_PRIVATE_KEY must be set.')

  const priv = `0x${randomBytes(32).toString('hex')}` as const
  const userAccount = privateKeyToAccount(priv)
  const user = userAccount.address

  console.log('user eoa:', user)

  const publicClient = createPublicClient({ transport: http(rpcUrl) })
  const codeBefore = (await publicClient.getCode({ address: user })) ?? '0x'
  console.log('user code before:', codeBefore.slice(0, 10))

  const balanceBefore = await publicClient.readContract({
    abi: ExperimentERC20.abi,
    address: exp1Address,
    functionName: 'balanceOf',
    args: [user],
  })
  console.log('exp1 balance before:', balanceBefore.toString())

  // 1) Prepare + store relay auth for the user.
  const authorizeKey = {
    expiry: '0x0',
    type: 'secp256k1',
    role: 'admin',
    publicKey: padAddressToBytes32(user),
    permissions: [],
  }

  const upgradePrep = await rpc('wallet_prepareUpgradeAccount', [
    {
      address: user,
      chainId: `0x${chainId.toString(16)}`,
      capabilities: { authorizeKeys: [authorizeKey] },
      delegation: delegationProxy,
    },
  ])

  const authDigest = upgradePrep.digests.auth as `0x${string}`
  const execDigest = upgradePrep.digests.exec as `0x${string}`
  const authSig = Signature.toHex(
    Secp256k1.sign({ payload: authDigest, privateKey: priv }),
  )
  const execSig = Signature.toHex(
    Secp256k1.sign({ payload: execDigest, privateKey: priv }),
  )

  await rpc('wallet_upgradeAccount', [
    {
      context: upgradePrep.context,
      signatures: {
        auth: authSig,
        exec: execSig,
      },
    },
  ])
  console.log('relay stored user account')

  // 2) Onboard onchain via the sponsoring-vite worker (merchant pays).
  const onboardResp = await fetch(`${uiUrl}/porto/onboard`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ address: user, gas: 5_000_000 }),
  })
  const onboardJson = (await onboardResp.json()) as any
  if (!onboardResp.ok || !onboardJson?.ok) {
    throw new Error(`onboard failed: ${JSON.stringify(onboardJson)}`)
  }
  console.log('onboard tx:', onboardJson.hash)

  const codeAfter = (await publicClient.getCode({ address: user })) ?? '0x'
  if (!codeAfter.startsWith('0xef0100')) {
    throw new Error(`delegation missing after onboard: code=${codeAfter}`)
  }
  console.log('user delegated onchain')

  // 3) Sponsored mint via relay.
  const mintData = encodeFunctionData({
    abi: ExperimentERC20.abi,
    functionName: 'mint',
    args: [user, parseEther('100')],
  })

  const prepareResult = await rpc('wallet_prepareCalls', [
    {
      calls: [
        {
          to: exp1Address,
          data: mintData,
          value: '0x0',
        },
      ],
      chainId: `0x${chainId.toString(16)}`,
      from: user,
      capabilities: {
        authorizeKeys: [],
        meta: { feePayer },
        preCall: false,
        preCalls: [],
        requiredFunds: [],
      },
      key: {
        type: 'secp256k1',
        publicKey: padAddressToBytes32(user),
        prehash: false,
      },
    },
  ])

  const typedData = prepareResult.typedData
  const context = prepareResult.context

  const userSignPayload = TypedData.getSignPayload(typedData)
  const userSig = Signature.toHex(
    Secp256k1.sign({
      payload: userSignPayload as `0x${string}`,
      privateKey: priv,
    }),
  )

  const feeKey = Key.fromSecp256k1({ privateKey: feePayerKey })
  const feeSignature = await Key.sign(feeKey, {
    address: null,
    payload: userSignPayload,
  })

  const sendResult = await rpc('wallet_sendPreparedCalls', [
    {
      capabilities: {
        feeSignature,
      },
      context,
      key: {
        type: 'secp256k1',
        publicKey: padAddressToBytes32(user),
        prehash: false,
      },
      signature: userSig,
    },
  ])

  console.log('sendPreparedCalls result:', JSON.stringify(sendResult))
  const bundleId = sendResult.id as `0x${string}` | undefined
  if (!bundleId) throw new Error('wallet_sendPreparedCalls returned no id')
  console.log('bundle id:', bundleId)
  const intentHash = sendResult.intentHash as `0x${string}` | undefined
  if (intentHash) console.log('intent hash:', intentHash)

  let includedTxHash: `0x${string}` | null = null
  for (let i = 0; i < 120; i++) {
    const status = await rpc('wallet_getCallsStatus', [bundleId])
    const receipts = status?.receipts as
      | Array<{
          transactionHash?: `0x${string}`
          transaction_hash?: `0x${string}`
        }>
      | undefined

    if (receipts && receipts.length > 0) {
      const r0 = receipts[0]
      includedTxHash = (r0.transactionHash ?? (r0 as any).transaction_hash) as
        | `0x${string}`
        | undefined
      if (includedTxHash) break
    }

    if (i % 10 === 0) {
      console.log('bundle status:', JSON.stringify(status))
      if (intentHash) {
        const routerStatus = await routerRpc('eth_getUserOperationByHash', [
          intentHash,
        ])
        console.log('router status:', JSON.stringify(routerStatus))
      }
    }
    await sleep(1_000)
  }

  if (!includedTxHash) throw new Error(`bundle not included: ${bundleId}`)
  console.log('included tx:', includedTxHash)

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: includedTxHash,
    timeout: 60_000,
  })
  if (receipt.status !== 'success') throw new Error('mint tx reverted')

  const balanceAfter = await publicClient.readContract({
    abi: ExperimentERC20.abi,
    address: exp1Address,
    functionName: 'balanceOf',
    args: [user],
  })
  console.log('exp1 balance after:', balanceAfter.toString())

  const delta = balanceAfter - balanceBefore
  if (delta !== parseEther('100')) {
    throw new Error(`mint delta mismatch: ${delta.toString()}`)
  }
  console.log('OK: sponsored mint succeeded')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
