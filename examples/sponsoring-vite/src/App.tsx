import { useEffect, useState } from 'react'
import {
  type Address,
  createPublicClient,
  formatEther,
  http,
  parseEther,
  UserRejectedRequestError,
} from 'viem'
import {
  type BaseError,
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useSendCalls,
  useWaitForCallsStatus,
} from 'wagmi'
import { onboardUrl, relayUrl } from './config'
import { exp1Address, exp1Config } from './contracts'
import { gwyneth } from './gwyneth'

export function App() {
  const { isConnected } = useAccount()
  return (
    <>
      <Account />
      {isConnected ? (
        <>
          <Balance />
          <Mint />
        </>
      ) : (
        <Connect />
      )}
    </>
  )
}

function Account() {
  const account = useAccount()
  const disconnect = useDisconnect()
  const [codeNonEmpty, setCodeNonEmpty] = useState<boolean | null>(null)
  const [hasRelayAuthorization, setHasRelayAuthorization] = useState<
    boolean | null
  >(null)
  const [onboardError, setOnboardError] = useState<string | null>(null)
  const [onboardTx, setOnboardTx] = useState<string | null>(null)
  const [isOnboarding, setIsOnboarding] = useState(false)

  useEffect(() => {
    setCodeNonEmpty(null)
    setHasRelayAuthorization(null)
    const address = account.address
    if (!address) return
    const publicClient = createPublicClient({
      chain: gwyneth,
      transport: http(),
    })
    void publicClient.getCode({ address }).then((code) => {
      setCodeNonEmpty(!!code && code !== '0x')
    })

    void fetch(relayUrl, {
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'wallet_getAuthorization',
        params: [{ address }],
      }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    })
      .then(async (r) => {
        const j = (await r.json()) as any
        setHasRelayAuthorization(!!j?.result)
      })
      .catch(() => {
        setHasRelayAuthorization(false)
      })
  }, [account.address])

  async function handleOnboard() {
    const address = account.address
    if (!address) return

    setOnboardError(null)
    setOnboardTx(null)
    setIsOnboarding(true)
    try {
      const resp = await fetch(onboardUrl, {
        body: JSON.stringify({ address }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      })
      const json = (await resp.json().catch(() => null)) as any
      if (!resp.ok) {
        throw new Error(json?.error ?? `onboard failed (${resp.status})`)
      }
      if (json?.hash) setOnboardTx(String(json.hash))

      const publicClient = createPublicClient({
        chain: gwyneth,
        transport: http(),
      })
      const code = await publicClient.getCode({ address })
      setCodeNonEmpty(!!code && code !== '0x')
    } catch (e) {
      setOnboardError((e as Error).message)
    } finally {
      setIsOnboarding(false)
    }
  }

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
        <br />
        `eth_getCode` non-empty:{' '}
        {codeNonEmpty === null ? '(checking...)' : codeNonEmpty ? 'yes' : 'no'}
        <br />
        prepared (relay auth):{' '}
        {hasRelayAuthorization === null
          ? '(checking...)'
          : hasRelayAuthorization
            ? 'yes'
            : 'no'}
      </div>

      {account.status !== 'disconnected' && (
        <button onClick={() => disconnect.disconnect()} type="button">
          Sign out
        </button>
      )}

      {account.address && hasRelayAuthorization && codeNonEmpty === false && (
        <div style={{ marginTop: 12 }}>
          <button
            disabled={isOnboarding}
            onClick={() => void handleOnboard()}
            type="button"
          >
            {isOnboarding ? 'Onboarding...' : 'Onboard (delegate onchain)'}
          </button>
          {onboardTx && <div>Onboard tx: {onboardTx}</div>}
          {onboardError && <div>Onboard error: {onboardError}</div>}
        </div>
      )}
    </div>
  )
}

function Connect() {
  const connect = useConnect()
  const [connector] = connect.connectors
  const { connectAsync } = connect
  const [status, setStatus] = useState<string | null>(null)

  async function handleSignIn() {
    if (!connector) return
    if (!connectAsync) return
    const relayHasAuthorization = async (address: Address) => {
      try {
        const r = await fetch(relayUrl, {
          body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method: 'wallet_getAuthorization',
            params: [{ address }],
          }),
          headers: { 'content-type': 'application/json' },
          method: 'POST',
        })
        const j = (await r.json()) as any
        return !!j?.result
      } catch {
        return false
      }
    }

    const ensureOnboarded = async (address: Address) => {
      const publicClient = createPublicClient({
        chain: gwyneth,
        transport: http(),
      })

      const code = await publicClient.getCode({ address })
      if (code && code !== '0x') return

      setStatus('Onboarding (delegating onchain)...')
      const resp = await fetch(onboardUrl, {
        body: JSON.stringify({ address }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      })
      const json = (await resp.json().catch(() => null)) as any
      if (!resp.ok) {
        throw new Error(json?.error ?? `onboard failed (${resp.status})`)
      }

      const deadlineMs = Date.now() + 30_000
      while (Date.now() < deadlineMs) {
        const code = await publicClient.getCode({ address })
        if (code && code !== '0x') return
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      throw new Error('onboard tx sent but delegation not visible yet')
    }

    let createdAddress: Address | undefined
    try {
      // Prefer creating a fresh account on this chain. This avoids the common case where
      // `selectAccount` returns an account remembered from a previous devnet run.
      setStatus('Creating account...')
      const created = await connectAsync({
        capabilities: {
          createAccount: {
            chainId: gwyneth.id,
          },
          selectAccount: false,
        },
        chainId: gwyneth.id,
        connector,
      } as any)

      createdAddress = created.accounts?.[0] as Address | undefined
      if (createdAddress) {
        // Relay authorization can lag for a moment; wait briefly before falling back.
        setStatus('Waiting for relay authorization...')
        const deadlineMs = Date.now() + 10_000
        while (Date.now() < deadlineMs) {
          if (await relayHasAuthorization(createdAddress)) {
            await ensureOnboarded(createdAddress)
            return
          }
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
        throw new Error('Created account missing relay authorization')
      }
    } catch (error) {
      if (error instanceof UserRejectedRequestError) return
      if (createdAddress) throw error
    }

    // Fallback: select an existing account and verify it is upgraded on this chain.
    try {
      setStatus('Selecting existing account...')
      await connectAsync({
        capabilities: {
          selectAccount: true,
        },
        chainId: gwyneth.id,
        connector,
      } as any)
      const [address] = (await connector.getAccounts()) as Address[]
      if (address && !(await relayHasAuthorization(address)))
        throw new Error('Selected account missing relay authorization')
      if (address) await ensureOnboarded(address)
    } catch (error) {
      if (error instanceof UserRejectedRequestError) return
      throw error
    }
  }

  if (connect.error) {
    console.error('connect.error', connect.error)
    // @ts-expect-error – vite dev only
    console.error('connect.error cause', connect.error.cause)
    // @ts-expect-error – vite dev only
    console.error('connect.error cause data', connect.error.cause?.data)
    // @ts-expect-error – vite dev only
    console.error('connect.error request', connect.error.request)
  }

  return (
    <div>
      <h2>Connect</h2>
      <button
        onClick={() => {
          setStatus(null)
          void handleSignIn().catch((error) => {
            if (error instanceof UserRejectedRequestError) return
            console.error('Failed to sign in', error)
          })
        }}
        type="button"
      >
        Sign in
      </button>
      <div>{connect.status}</div>
      {status && <div>{status}</div>}
      <div>{connect.error?.message}</div>
    </div>
  )
}

function Balance() {
  const { address } = useAccount()
  const { data: balance } = useReadContract({
    ...exp1Config,
    args: [address!],
    functionName: 'balanceOf',
    query: {
      enabled: !!address,
      refetchInterval: 2_000,
    },
  })

  return (
    <div>
      <h2>Balance</h2>
      <div>Balance: {formatEther(balance ?? 0n)} EXP</div>
    </div>
  )
}

function Mint() {
  const { address } = useAccount()
  const { data, error, isPending, sendCalls } = useSendCalls()
  const [bundleStatus, setBundleStatus] = useState<number | null>(null)
  const [bundleReceipts, setBundleReceipts] = useState<number | null>(null)
  const [bundleTxHash, setBundleTxHash] = useState<string | null>(null)
  const [bundleError, setBundleError] = useState<string | null>(null)

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForCallsStatus({
      id: data?.id,
      timeout: 180_000,
    })

  useEffect(() => {
    setBundleStatus(null)
    setBundleReceipts(null)
    setBundleTxHash(null)
    setBundleError(null)
    const id = data?.id
    if (!id) return

    let cancelled = false
    const poll = async () => {
      try {
        const resp = await fetch(relayUrl, {
          body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method: 'wallet_getCallsStatus',
            params: [id],
          }),
          headers: { 'content-type': 'application/json' },
          method: 'POST',
        })
        const json = (await resp.json()) as any
        if (cancelled) return
        if (json?.error) {
          setBundleError(json.error?.message ?? String(json.error))
          return
        }
        const status = json?.result?.status
        const receipts = json?.result?.receipts
        if (typeof status === 'number') setBundleStatus(status)
        if (Array.isArray(receipts)) {
          setBundleReceipts(receipts.length)
          const txHash = receipts[0]?.transactionHash
          if (typeof txHash === 'string') setBundleTxHash(txHash)
        }
        if (typeof status === 'number' && status !== 100) return
      } catch (e) {
        if (!cancelled) setBundleError((e as Error).message)
        return
      }
      setTimeout(poll, 1_000)
    }
    void poll()
    return () => {
      cancelled = true
    }
  }, [data?.id])

  return (
    <div>
      <h2>Mint EXP</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendCalls({
            calls: [
              {
                ...exp1Config,
                args: [address!, parseEther('100')],
                functionName: 'mint',
                to: exp1Address,
              },
            ],
          })
        }}
      >
        <button disabled={isPending} type="submit">
          {isPending ? 'Confirming...' : 'Mint 100 EXP'}
        </button>
      </form>
      {data?.id && <div>Bundle ID: {data.id}</div>}
      {bundleStatus !== null && (
        <div>
          Relay status: {bundleStatus}
          {bundleReceipts !== null ? ` (receipts: ${bundleReceipts})` : ''}
        </div>
      )}
      {bundleTxHash && <div>Tx: {bundleTxHash}</div>}
      {bundleError && <div>Relay status error: {bundleError}</div>}
      {(bundleStatus === null ? isConfirming : bundleStatus === 100) &&
        'Waiting for confirmation...'}
      {(isConfirmed || (bundleStatus !== null && bundleStatus >= 200)) &&
        'Transaction confirmed.'}
      {bundleStatus !== null && bundleStatus >= 300 && 'Transaction failed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  )
}
