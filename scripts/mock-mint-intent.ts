import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as dotenv from 'dotenv'
import { encodeFunctionData, http, parseEther } from 'viem'
import { createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as PublicActions from 'viem/actions'

import * as Authorization from 'ox/Authorization'
import * as Secp256k1 from 'ox/Secp256k1'
import * as Hex from 'ox/Hex'
import * as Signature from 'ox/Signature'
import * as TypedData from 'ox/TypedData'

import * as Key from '../src/viem/Key.js'
import * as ExperimentERC20 from '../src/core/internal/_generated/contracts/ExperimentERC20.js'

type GwAddresses = {
  chainId: number
  rpcUrl?: string
  contracts: {
    orchestrator: `0x${string}`
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
const routerUrl = process.env.PORTO_ROUTER_URL ?? 'http://localhost:32005'
const addressesPath =
  process.env.PORTO_ADDRESSES_PATH ??
  resolve(__dirname, '../config/gwyneth-addresses.json')
const addresses = JSON.parse(
  readFileSync(addressesPath, 'utf-8'),
) as GwAddresses

const chainId = addresses.chainId ?? 160010
const rpcUrl =
  process.env.PORTO_RPC_URL ?? addresses.rpcUrl ?? 'http://localhost:32002'
const exp1Address = addresses.demoTokens.exp1

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as
  | `0x${string}`
  | undefined
const mockFunderPrivateKey = process.env.MOCK_FUNDER_PRIVATE_KEY as
  | `0x${string}`
  | undefined
const feePayer = (process.env.MERCHANT_ADDRESS ?? '') as `0x${string}`
const feePayerKey = (process.env.MERCHANT_PRIVATE_KEY ?? '') as `0x${string}`

const mockUserPriv =
  (process.env.MOCK_USER_PRIVATE_KEY as `0x${string}` | undefined) ??
  ('0x1000000000000000000000000000000000000000000000000000000000000001' as const)

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

function padAddressToBytes32(address: `0x${string}`): `0x${string}` {
  return `0x${'0'.repeat(24)}${address.slice(2).toLowerCase()}` as `0x${string}`
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function main() {
  if (!feePayer || !feePayerKey)
    throw new Error('MERCHANT_ADDRESS and MERCHANT_PRIVATE_KEY must be set.')

  const userAccount = privateKeyToAccount(mockUserPriv)
  const user = userAccount.address
  console.log('user eoa:', user)

  const funderPriv = mockFunderPrivateKey ?? deployerPrivateKey ?? feePayerKey
  const funder = privateKeyToAccount(funderPriv)
  const l1 = createWalletClient({
    account: funder,
    chain: { id: chainId } as any,
    transport: http(rpcUrl),
  })

  const userL1 = createWalletClient({
    account: userAccount,
    chain: { id: chainId } as any,
    transport: http(rpcUrl),
  })

  const delegatedCodeBefore =
    (await PublicActions.getCode(userL1, { address: user })) ?? '0x'
  const isDelegatedBefore = delegatedCodeBefore.startsWith('0xef0100')
  if (isDelegatedBefore) {
    console.log('user already delegated onchain')
  }

  const balanceBefore = await PublicActions.readContract(l1, {
    abi: ExperimentERC20.abi,
    address: exp1Address,
    functionName: 'balanceOf',
    args: [user],
  })
  console.log('balance before:', balanceBefore.toString())

  const targetUserBalance = parseEther(process.env.MOCK_USER_FUND_ETH ?? '0.05')
  if (targetUserBalance > 0n && !isDelegatedBefore) {
    const userBalance = await PublicActions.getBalance(l1, { address: user })
    if (userBalance < targetUserBalance) {
      const topUp = targetUserBalance - userBalance
      const fundHash = await PublicActions.sendTransaction(l1, {
        to: user,
        value: topUp,
      })
      await PublicActions.waitForTransactionReceipt(l1, { hash: fundHash })
      console.log('funded user:', fundHash, 'topUp:', topUp.toString())
    } else {
      console.log('user already funded:', userBalance.toString())
    }
  } else if (targetUserBalance > 0n) {
    console.log(
      'skipping user funding (delegated accounts may reject plain transfers)',
    )
  }

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
      delegation: addresses.contracts.accountProxy,
    },
  ])

  const authDigest = upgradePrep.digests.auth as `0x${string}`
  const execDigest = upgradePrep.digests.exec as `0x${string}`
  const authSig = Signature.toHex(
    Secp256k1.sign({ payload: authDigest, privateKey: mockUserPriv }),
  )
  const execSig = Signature.toHex(
    Secp256k1.sign({ payload: execDigest, privateKey: mockUserPriv }),
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

  const onboardingTx = await rpc('wallet_getAuthorization', [{ address: user }])
  const onboardingTo = onboardingTx.to as `0x${string}` | undefined
  const onboardingData = onboardingTx.data as `0x${string}` | undefined
  if (!onboardingTo || !onboardingData) {
    throw new Error(
      `wallet_getAuthorization returned empty tx fields for ${user}`,
    )
  }

  const txNonce = await PublicActions.getTransactionCount(userL1, {
    address: user,
    blockTag: 'pending',
  })
  const authNonce = BigInt(txNonce + 1)
  const authPayload = Authorization.getSignPayload({
    address: addresses.contracts.accountProxy,
    chainId,
    nonce: authNonce,
  }) as `0x${string}`
  const authSigHex = Signature.toHex(
    Secp256k1.sign({ payload: authPayload, privateKey: mockUserPriv }),
  )
  const authSignature = Signature.from(authSigHex)
  const authorizationList = [
    {
      chainId,
      address: addresses.contracts.accountProxy,
      nonce: txNonce + 1,
      r: Hex.fromNumber(authSignature.r, { size: 32 }),
      s: Hex.fromNumber(authSignature.s, { size: 32 }),
      yParity: authSignature.yParity,
    },
  ]

  if (!isDelegatedBefore) {
    const onboardingHash = await PublicActions.sendTransaction(userL1, {
      authorizationList,
      to: onboardingTo,
      data: onboardingData,
      value: 0n,
      gas: 5_000_000n,
      maxFeePerGas: 1_000_000_000n,
      maxPriorityFeePerGas: 1_000_000_000n,
    })
    const onboardingReceipt = await PublicActions.waitForTransactionReceipt(
      userL1,
      {
        hash: onboardingHash,
      },
    )
    if (onboardingReceipt.status !== 'success') {
      throw new Error(`user onboarding tx reverted: ${onboardingHash}`)
    }

    const delegatedCode = await PublicActions.getCode(userL1, { address: user })
    if (!delegatedCode.startsWith('0xef0100')) {
      throw new Error(
        `user delegation missing after onboarding: code=${delegatedCode}`,
      )
    }
    console.log('user delegated onchain:', onboardingHash)
  }

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
      privateKey: mockUserPriv,
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

  const maxPolls = Number(process.env.BUNDLE_POLL_COUNT ?? 300)
  const pollDelayMs = Number(process.env.BUNDLE_POLL_DELAY_MS ?? 1_000)

  let includedTxHash: `0x${string}` | null = null
  for (let i = 0; i < maxPolls; i++) {
    const status = await rpc('wallet_getCallsStatus', [bundleId])
    const receipts = (status?.receipts ?? status?.Receipts) as
      | Array<{
          transactionHash?: `0x${string}`
          transaction_hash?: `0x${string}`
        }>
      | undefined

    if (receipts && receipts.length > 0) {
      const receipt0 = receipts[0]
      includedTxHash = (receipt0.transactionHash ??
        (receipt0 as any).transaction_hash) as `0x${string}` | undefined
      if (includedTxHash) {
        console.log('bundle included tx:', includedTxHash)
        break
      }
    }

    // Print status occasionally for debugging.
    if (i % 10 === 0) console.log('bundle status:', JSON.stringify(status))
    await sleep(pollDelayMs)
  }

  if (!includedTxHash) {
    throw new Error(
      `bundle not included after ${maxPolls} polls (id=${bundleId})`,
    )
  }

  // Wait for receipt and ensure it succeeded.
  const receiptMaxPolls = Number(process.env.TX_RECEIPT_POLL_COUNT ?? 180)
  const receiptDelayMs = Number(process.env.TX_RECEIPT_POLL_DELAY_MS ?? 1_000)
  let receiptStatus: 'success' | 'reverted' | null = null
  for (let i = 0; i < receiptMaxPolls; i++) {
    let receipt: { status: 'success' | 'reverted' } | null = null
    try {
      receipt = await PublicActions.getTransactionReceipt(l1, {
        hash: includedTxHash,
      })
    } catch {
      await sleep(receiptDelayMs)
      continue
    }

    receiptStatus = receipt.status
    console.log('l1 receipt status:', receiptStatus)
    break
  }

  if (!receiptStatus) {
    throw new Error(
      `receipt not found after ${receiptMaxPolls} polls: ${includedTxHash}`,
    )
  }
  if (receiptStatus !== 'success') {
    throw new Error(`tx reverted: ${includedTxHash}`)
  }

  const balanceAfter = await PublicActions.readContract(l1, {
    abi: ExperimentERC20.abi,
    address: exp1Address,
    functionName: 'balanceOf',
    args: [user],
  })
  console.log('balance after:', balanceAfter.toString())

  const expectedDelta = parseEther('100')
  const delta = balanceAfter - balanceBefore
  console.log('balance delta:', delta.toString())
  if (delta !== expectedDelta) {
    throw new Error(
      `mint delta mismatch: expected ${expectedDelta} got ${delta} (before=${balanceBefore} after=${balanceAfter})`,
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
