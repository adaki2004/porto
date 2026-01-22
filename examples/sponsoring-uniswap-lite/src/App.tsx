import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import {
  type Address,
  createPublicClient,
  formatUnits,
  type Hash,
  http,
  maxUint256,
  parseUnits,
  zeroAddress,
} from 'viem'
import {
  type BaseError,
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useWriteContract,
} from 'wagmi'
import { gwynethL1, gwynethL2A, gwynethL2B } from './config'
import {
  erc20Abi,
  TOKENS,
  type TokenKey,
  UNISWAP_V2,
  uniswapPortalAbi,
  uniswapV2FactoryAbi,
  uniswapV2PairAbi,
  uniswapV2Router02Abi,
} from './contracts'
import { readContractsViaUniswapMulticall } from './multicall'

type Tab = 'swap' | 'pool'

const CHAINS = [gwynethL1, gwynethL2A, gwynethL2B] as const

function shortAddress(address?: Address, chars = 4) {
  if (!address) return ''
  const prefix = address.slice(0, 2 + chars)
  const suffix = address.slice(-chars)
  return `${prefix}…${suffix}`
}

function tokenEntries() {
  return Object.entries(TOKENS) as Array<[TokenKey, (typeof TOKENS)[TokenKey]]>
}

export function App() {
  const [tab, setTab] = useState<Tab>('swap')
  const account = useAccount()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const { writeContractAsync } = useWriteContract()

  const [swapTokenIn, setSwapTokenIn] = useState<TokenKey>('TAIKO')
  const [swapTokenOut, setSwapTokenOut] = useState<TokenKey>('CHEESE')
  const [swapAmountIn, setSwapAmountIn] = useState('')
  const [poolAmountA, setPoolAmountA] = useState('10')
  const [poolAmountB, setPoolAmountB] = useState('10')

  const [swapStage, setSwapStage] = useState<
    'idle' | 'approving' | 'swapping' | 'confirming' | 'success' | 'error'
  >('idle')
  const [swapHash, setSwapHash] = useState<Hash | null>(null)
  const [swapError, setSwapError] = useState<string | null>(null)

  const [liqStage, setLiqStage] = useState<
    'idle' | 'approving' | 'adding' | 'confirming' | 'success' | 'error'
  >('idle')
  const [liqHash, setLiqHash] = useState<Hash | null>(null)
  const [liqError, setLiqError] = useState<string | null>(null)

  const [tokenModalOpen, setTokenModalOpen] = useState(false)
  const [tokenModalSide, setTokenModalSide] = useState<'in' | 'out'>('in')

  const activeChain = useMemo(() => {
    return CHAINS.find((c) => c.id === account.chainId)
  }, [account.chainId])

  const l1Client = useMemo(() => {
    return createPublicClient({
      chain: gwynethL1,
      transport: http(gwynethL1.rpcUrls.default.http[0]),
    })
  }, [])

  const activeClient = useMemo(() => {
    if (!activeChain) return null
    return createPublicClient({
      chain: activeChain,
      transport: http(activeChain.rpcUrls.default.http[0]),
    })
  }, [activeChain])

  const needsWallet = !account.isConnected
  const wrongChain = account.isConnected && !activeChain

  const [connector] = connect.connectors

  const handleConnect = () => {
    if (!connector) return
    connect.connect({ connector })
  }

  const handleDisconnect = () => {
    disconnect.disconnect()
  }

  const openTokenModal = (side: 'in' | 'out') => {
    setTokenModalSide(side)
    setTokenModalOpen(true)
  }

  const handleSelectToken = (key: TokenKey) => {
    if (tokenModalSide === 'in') setSwapTokenIn(key)
    else setSwapTokenOut(key)
    setTokenModalOpen(false)
  }

  const tokenInMeta = TOKENS[swapTokenIn]
  const tokenOutMeta = TOKENS[swapTokenOut]

  const amountInParsed = useMemo(() => {
    const trimmed = swapAmountIn.trim()
    if (!trimmed) return 0n
    try {
      return parseUnits(trimmed, tokenInMeta.decimals)
    } catch {
      return 0n
    }
  }, [swapAmountIn, tokenInMeta.decimals])

  const l2PortalEnabled = activeChain?.id === gwynethL2A.id

  const balancesQuery = useQuery({
    enabled:
      !!account.address &&
      !!activeClient &&
      (activeChain?.id === gwynethL1.id ||
        activeChain?.id === gwynethL2A.id ||
        activeChain?.id === gwynethL2B.id),
    queryFn: async () => {
      if (!account.address) throw new Error('Missing address')
      if (!activeClient) throw new Error('Missing active client')

      // Uniswap Multicall is not deployed on L2 by default, so fall back to direct reads there.
      if (activeChain?.id === gwynethL1.id) {
        const results = await readContractsViaUniswapMulticall(activeClient, [
          {
            abi: erc20Abi,
            address: tokenInMeta.address,
            args: [account.address],
            functionName: 'balanceOf',
          },
          {
            abi: erc20Abi,
            address: tokenOutMeta.address,
            args: [account.address],
            functionName: 'balanceOf',
          },
        ])
        const [balIn, balOut] = results as [bigint, bigint]
        return { balIn, balOut }
      }

      const [balIn, balOut] = await Promise.all([
        activeClient.readContract({
          abi: erc20Abi,
          address: tokenInMeta.address,
          args: [account.address],
          functionName: 'balanceOf',
        }) as Promise<bigint>,
        activeClient.readContract({
          abi: erc20Abi,
          address: tokenOutMeta.address,
          args: [account.address],
          functionName: 'balanceOf',
        }) as Promise<bigint>,
      ])

      return { balIn, balOut }
    },
    queryKey: [
      'balances',
      account.address,
      activeChain?.id,
      swapTokenIn,
      swapTokenOut,
    ],
    refetchInterval: 2_000,
  })

  const quoteQuery = useQuery({
    enabled:
      swapTokenIn !== swapTokenOut && amountInParsed > 0n && tab === 'swap',
    queryFn: async () => {
      const amounts = await l1Client.readContract({
        abi: uniswapV2Router02Abi,
        address: UNISWAP_V2.router02,
        args: [amountInParsed, [tokenInMeta.address, tokenOutMeta.address]],
        functionName: 'getAmountsOut',
      })
      return amounts[1]
    },
    queryKey: ['quote', swapTokenIn, swapTokenOut, amountInParsed.toString()],
    refetchInterval: 5_000,
  })

  const amountOutFormatted = useMemo(() => {
    if (!quoteQuery.data) return ''
    return formatUnits(quoteQuery.data, tokenOutMeta.decimals)
  }, [quoteQuery.data, tokenOutMeta.decimals])

  const poolQuery = useQuery({
    enabled: tab === 'pool',
    queryFn: async () => {
      const tokenA = TOKENS.TAIKO
      const tokenB = TOKENS.CHEESE

      const pair = (await l1Client.readContract({
        abi: uniswapV2FactoryAbi,
        address: UNISWAP_V2.factory,
        args: [tokenA.address, tokenB.address],
        functionName: 'getPair',
      })) as Address

      if (!pair || pair === zeroAddress) {
        return {
          exists: false,
          pair: zeroAddress as Address,
        }
      }

      const [[reserve0, reserve1], token0, token1] = await Promise.all([
        l1Client
          .readContract({
            abi: uniswapV2PairAbi,
            address: pair,
            functionName: 'getReserves',
          })
          .then((res) => [res[0], res[1]] as const),
        l1Client.readContract({
          abi: uniswapV2PairAbi,
          address: pair,
          functionName: 'token0',
        }),
        l1Client.readContract({
          abi: uniswapV2PairAbi,
          address: pair,
          functionName: 'token1',
        }),
      ])

      const token0Symbol =
        token0.toLowerCase() === tokenA.address.toLowerCase()
          ? tokenA.symbol
          : tokenB.symbol
      const token1Symbol =
        token1.toLowerCase() === tokenA.address.toLowerCase()
          ? tokenA.symbol
          : tokenB.symbol

      const token0Decimals =
        token0.toLowerCase() === tokenA.address.toLowerCase()
          ? tokenA.decimals
          : tokenB.decimals
      const token1Decimals =
        token1.toLowerCase() === tokenA.address.toLowerCase()
          ? tokenA.decimals
          : tokenB.decimals

      return {
        exists: true,
        pair,
        reserve0,
        reserve1,
        token0: token0Symbol,
        token0Decimals,
        token1: token1Symbol,
        token1Decimals,
      }
    },
    queryKey: ['pool', 'TAIKO', 'CHEESE'],
    refetchInterval: 10_000,
  })

  const balanceInFormatted = useMemo(() => {
    const v = balancesQuery.data?.balIn
    if (v === undefined) return '—'
    return formatUnits(v, tokenInMeta.decimals)
  }, [balancesQuery.data?.balIn, tokenInMeta.decimals])

  const balanceOutFormatted = useMemo(() => {
    const v = balancesQuery.data?.balOut
    if (v === undefined) return '—'
    return formatUnits(v, tokenOutMeta.decimals)
  }, [balancesQuery.data?.balOut, tokenOutMeta.decimals])

  const allowancesQuery = useQuery({
    enabled:
      !!account.address && !!activeClient && activeChain?.id === gwynethL1.id,
    queryFn: async () => {
      if (!account.address) throw new Error('Missing address')
      if (!activeClient) throw new Error('Missing active client')
      const tokenA = TOKENS.TAIKO
      const tokenB = TOKENS.CHEESE
      const results = await readContractsViaUniswapMulticall(activeClient, [
        {
          abi: erc20Abi,
          address: tokenInMeta.address,
          args: [account.address, UNISWAP_V2.router02],
          functionName: 'allowance',
        },
        {
          abi: erc20Abi,
          address: tokenA.address,
          args: [account.address, UNISWAP_V2.router02],
          functionName: 'allowance',
        },
        {
          abi: erc20Abi,
          address: tokenB.address,
          args: [account.address, UNISWAP_V2.router02],
          functionName: 'allowance',
        },
      ])
      const [swapAllowance, taikoAllowance, cheeseAllowance] = results as [
        bigint,
        bigint,
        bigint,
      ]
      return { cheeseAllowance, swapAllowance, taikoAllowance }
    },
    queryKey: ['allowances', account.address, swapTokenIn, activeChain?.id],
    refetchInterval: 2_000,
  })

  const isOnL1 = activeChain?.id === gwynethL1.id
  const isOnL2 =
    activeChain?.id === gwynethL2A.id || activeChain?.id === gwynethL2B.id

  const normalizeError = (error: unknown) => {
    const base = error as BaseError | undefined
    const message =
      base?.shortMessage || (error as Error)?.message || String(error)
    if (message.includes('User rejected')) return null
    return message
  }

  const waitForReceiptOn = async (
    client: { waitForTransactionReceipt: (args: any) => Promise<any> },
    hash: Hash,
  ) => {
    await client.waitForTransactionReceipt({
      hash,
      timeout: 120_000,
    })
  }

  const handleSwap = async () => {
    setSwapError(null)
    setSwapHash(null)
    setSwapStage('idle')

    if (!account.address) return
    if (!activeClient) return
    if (!isOnL1 && !isOnL2) return
    if (amountInParsed <= 0n) {
      setSwapStage('error')
      setSwapError('Enter an amount.')
      return
    }

    const minOut = quoteQuery.data ? (quoteQuery.data * 995n) / 1000n : 0n
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20)

    try {
      if (isOnL1) {
        const allowance = allowancesQuery.data?.swapAllowance ?? 0n
        if (allowance < amountInParsed) {
          setSwapStage('approving')
          const approveHash = (await writeContractAsync({
            abi: erc20Abi,
            address: tokenInMeta.address,
            args: [UNISWAP_V2.router02, maxUint256],
            functionName: 'approve',
          })) as Hash
          setSwapHash(approveHash)
          setSwapStage('confirming')
          await waitForReceiptOn(l1Client, approveHash)
        }

        setSwapStage('swapping')
        const swapHash = (await writeContractAsync({
          abi: uniswapV2Router02Abi,
          address: UNISWAP_V2.router02,
          args: [
            amountInParsed,
            minOut,
            [tokenInMeta.address, tokenOutMeta.address],
            account.address,
            deadline,
          ],
          functionName: 'swapExactTokensForTokens',
        })) as Hash
        setSwapHash(swapHash)
        setSwapStage('confirming')
        await waitForReceiptOn(l1Client, swapHash)
        setSwapStage('success')
        setSwapAmountIn('')
        return
      }

      if (!l2PortalEnabled) {
        setSwapStage('error')
        setSwapError(
          'Portal swaps are only supported on L2A (167010) right now. Switch to L2A or L1.',
        )
        return
      }

      const portalAllowance = (await activeClient.readContract({
        abi: erc20Abi,
        address: tokenInMeta.address,
        args: [account.address, UNISWAP_V2.portal],
        functionName: 'allowance',
      })) as bigint

      if (portalAllowance < amountInParsed) {
        setSwapStage('approving')
        const approveHash = (await writeContractAsync({
          abi: erc20Abi,
          address: tokenInMeta.address,
          args: [UNISWAP_V2.portal, maxUint256],
          functionName: 'approve',
        })) as Hash
        setSwapHash(approveHash)
        setSwapStage('confirming')
        await waitForReceiptOn(activeClient, approveHash)
      }

      setSwapStage('swapping')
      const portalSwapHash = (await writeContractAsync({
        abi: uniswapPortalAbi,
        address: UNISWAP_V2.portal,
        args: [
          amountInParsed,
          minOut,
          [tokenInMeta.address, tokenOutMeta.address],
          account.address,
          deadline,
        ],
        functionName: 'swapExactTokensForTokens',
      })) as Hash
      setSwapHash(portalSwapHash)
      setSwapStage('confirming')
      await waitForReceiptOn(activeClient, portalSwapHash)
      setSwapStage('success')
      setSwapAmountIn('')
    } catch (error) {
      const message = normalizeError(error)
      if (!message) return
      setSwapStage('error')
      setSwapError(message)
    }
  }

  const handleAddLiquidity = async () => {
    setLiqError(null)
    setLiqHash(null)
    setLiqStage('idle')

    if (!account.address) return
    if (!isOnL1) {
      setLiqStage('error')
      setLiqError('Switch to Gwyneth L1 (160010) to add liquidity.')
      return
    }

    const tokenA = TOKENS.TAIKO
    const tokenB = TOKENS.CHEESE
    let amountA = 0n
    let amountB = 0n
    try {
      amountA = parseUnits(poolAmountA || '0', tokenA.decimals)
      amountB = parseUnits(poolAmountB || '0', tokenB.decimals)
    } catch {
      setLiqStage('error')
      setLiqError('Invalid amount.')
      return
    }
    if (amountA <= 0n || amountB <= 0n) {
      setLiqStage('error')
      setLiqError('Enter both amounts.')
      return
    }

    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20)

    try {
      const taikoAllowance = allowancesQuery.data?.taikoAllowance ?? 0n
      const cheeseAllowance = allowancesQuery.data?.cheeseAllowance ?? 0n
      if (taikoAllowance < amountA) {
        setLiqStage('approving')
        const h = (await writeContractAsync({
          abi: erc20Abi,
          address: tokenA.address,
          args: [UNISWAP_V2.router02, maxUint256],
          functionName: 'approve',
        })) as Hash
        setLiqHash(h)
        setLiqStage('confirming')
        await waitForReceiptOn(l1Client, h)
      }
      if (cheeseAllowance < amountB) {
        setLiqStage('approving')
        const h = (await writeContractAsync({
          abi: erc20Abi,
          address: tokenB.address,
          args: [UNISWAP_V2.router02, maxUint256],
          functionName: 'approve',
        })) as Hash
        setLiqHash(h)
        setLiqStage('confirming')
        await waitForReceiptOn(l1Client, h)
      }

      setLiqStage('adding')
      const addHash = (await writeContractAsync({
        abi: uniswapV2Router02Abi,
        address: UNISWAP_V2.router02,
        args: [
          tokenA.address,
          tokenB.address,
          amountA,
          amountB,
          0n,
          0n,
          account.address,
          deadline,
        ],
        functionName: 'addLiquidity',
      })) as Hash
      setLiqHash(addHash)
      setLiqStage('confirming')
      await waitForReceiptOn(l1Client, addHash)
      setLiqStage('success')
    } catch (error) {
      const message = normalizeError(error)
      if (!message) return
      setLiqStage('error')
      setLiqError(message)
    }
  }

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="logo" />
            <div>
              <h1>Gwyneth Swap</h1>
              <p className="subtitle">Wallet first → Porto later</p>
            </div>
          </div>

          <div className="topActions">
            <ChainMenu />
            {account.isConnected ? (
              <>
                <span className="pill" title={account.address}>
                  <span className="mono">{shortAddress(account.address)}</span>
                </span>
                <button
                  className="btn"
                  onClick={handleDisconnect}
                  type="button"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                className="btn btnPrimary"
                onClick={handleConnect}
                type="button"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </header>

        <main className="layout">
          <section className="card">
            <div className="cardHeader">
              <div className="tabs">
                <button
                  className={`tab ${tab === 'swap' ? 'tabActive' : ''}`}
                  onClick={() => setTab('swap')}
                  type="button"
                >
                  Swap
                </button>
                <button
                  className={`tab ${tab === 'pool' ? 'tabActive' : ''}`}
                  onClick={() => setTab('pool')}
                  type="button"
                >
                  Pool
                </button>
              </div>

              <button className="iconBtn" type="button">
                ⚙
              </button>
            </div>

            <div className="cardBody">
              {wrongChain && (
                <div className="notice error">
                  Connected to an unknown chain. Add the Gwyneth devnet networks
                  to your wallet (L1 `160010`, L2A `167010`, L2B `167011`).
                </div>
              )}

              {tab === 'swap' ? (
                <>
                  <div className="field">
                    <div className="fieldTop">
                      <div className="fieldLabel">You pay</div>
                      <div className="fieldLabel">
                        Balance:{' '}
                        <span className="mono">
                          {balanceInFormatted} {tokenInMeta.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="fieldTop fieldRow">
                      <input
                        className="amountInput"
                        inputMode="decimal"
                        onChange={(e) => setSwapAmountIn(e.target.value)}
                        placeholder="0"
                        value={swapAmountIn}
                      />
                      <button
                        className="tokenButton"
                        onClick={() => openTokenModal('in')}
                        type="button"
                      >
                        <span className="tokenIcon">
                          {tokenInMeta.symbol.slice(0, 1)}
                        </span>
                        {tokenInMeta.symbol} <span className="muted">▾</span>
                      </button>
                    </div>
                  </div>

                  <div className="divider">
                    <button
                      className="swapArrow"
                      onClick={() => {
                        setSwapTokenIn(swapTokenOut)
                        setSwapTokenOut(swapTokenIn)
                        setSwapAmountIn('')
                      }}
                      type="button"
                    >
                      ↓
                    </button>
                  </div>

                  <div className="field">
                    <div className="fieldTop">
                      <div className="fieldLabel">You receive</div>
                      <div className="fieldLabel">
                        Balance:{' '}
                        <span className="mono">
                          {balanceOutFormatted} {tokenOutMeta.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="fieldTop fieldRow">
                      <input
                        className="amountInput"
                        inputMode="decimal"
                        placeholder="0"
                        readOnly
                        value={amountOutFormatted}
                      />
                      <button
                        className="tokenButton"
                        onClick={() => openTokenModal('out')}
                        type="button"
                      >
                        <span className="tokenIcon">
                          {tokenOutMeta.symbol.slice(0, 1)}
                        </span>
                        {tokenOutMeta.symbol} <span className="muted">▾</span>
                      </button>
                    </div>
                  </div>

                  <div className="metaRow">
                    <span>Route</span>
                    <span>
                      {tokenInMeta.symbol} → {tokenOutMeta.symbol}
                    </span>
                  </div>
                  <div className="metaRow">
                    <span>Quote</span>
                    <span>
                      {quoteQuery.isFetching ? '…' : amountOutFormatted || '—'}
                    </span>
                  </div>

                  <button
                    className="btn btnPrimary cta"
                    disabled={
                      needsWallet || wrongChain || (!isOnL1 && !l2PortalEnabled)
                    }
                    onClick={() => {
                      void handleSwap()
                    }}
                    type="button"
                  >
                    {needsWallet
                      ? 'Connect Wallet'
                      : wrongChain
                        ? 'Wrong Network'
                        : !isOnL1 && !l2PortalEnabled
                          ? 'Switch to L1'
                          : swapStage === 'approving'
                            ? 'Approving…'
                            : swapStage === 'swapping'
                              ? 'Swapping…'
                              : swapStage === 'confirming'
                                ? 'Confirming…'
                                : isOnL2
                                  ? 'Swap via Portal'
                                  : 'Swap'}
                  </button>
                  {isOnL2 ? (
                    <div className="notice">
                      {l2PortalEnabled
                        ? 'Swap executes on L1 via `UniswapPortal` and returns the output token to this L2. Ensure you have token balance + ETH for gas on this chain.'
                        : 'Portal swaps are only supported on L2A (167010) right now.'}
                    </div>
                  ) : null}
                  {isOnL1 ? (
                    <div className="notice">
                      Dev bridge helper is disabled (xTransfer is not supported
                      as a normal L1 tx in this flow).
                    </div>
                  ) : null}
                  {swapHash && (
                    <div className="notice">
                      Tx: <span className="mono">{swapHash}</span>
                    </div>
                  )}
                  {swapError && (
                    <div className="notice error">
                      <span className="error">{swapError}</span>
                    </div>
                  )}
                  <div className="notice">
                    L1 swaps call `UniswapV2Router02`. L2A swaps call
                    `UniswapPortal.swapExactTokensForTokens(...)` which performs
                    the L1 swap and bridges outputs back.
                  </div>
                </>
              ) : (
                <>
                  <div className="field">
                    <div className="fieldTop">
                      <div className="fieldLabel">Add liquidity</div>
                      <div className="fieldLabel">
                        Pair: <span className="mono">TAIKO/CHEESE</span>
                      </div>
                    </div>
                    <div className="notice" style={{ marginTop: 12 }}>
                      <div
                        style={{ display: 'grid', gap: 10, marginBottom: 12 }}
                      >
                        <label>
                          <div className="fieldLabel">TAIKO amount</div>
                          <input
                            className="amountInput"
                            inputMode="decimal"
                            onChange={(e) => setPoolAmountA(e.target.value)}
                            placeholder="10"
                            style={{ fontSize: 18 }}
                            value={poolAmountA}
                          />
                        </label>
                        <label>
                          <div className="fieldLabel">CHEESE amount</div>
                          <input
                            className="amountInput"
                            inputMode="decimal"
                            onChange={(e) => setPoolAmountB(e.target.value)}
                            placeholder="10"
                            style={{ fontSize: 18 }}
                            value={poolAmountB}
                          />
                        </label>
                      </div>
                      <div>
                        Pair address:{' '}
                        <span className="mono">
                          {poolQuery.data?.exists
                            ? shortAddress(poolQuery.data.pair)
                            : '—'}
                        </span>
                      </div>
                      <div>
                        Reserves:{' '}
                        {poolQuery.data?.exists ? (
                          <span className="mono">
                            {formatUnits(
                              poolQuery.data.reserve0!,
                              poolQuery.data.token0Decimals!,
                            )}{' '}
                            {poolQuery.data.token0} ·{' '}
                            {formatUnits(
                              poolQuery.data.reserve1!,
                              poolQuery.data.token1Decimals!,
                            )}{' '}
                            {poolQuery.data.token1}
                          </span>
                        ) : poolQuery.isFetching ? (
                          <span className="mono">…</span>
                        ) : (
                          <span className="mono">No pool yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btnPrimary cta"
                    disabled={needsWallet || wrongChain || !isOnL1}
                    onClick={() => {
                      void handleAddLiquidity()
                    }}
                    type="button"
                  >
                    {needsWallet
                      ? 'Connect Wallet'
                      : wrongChain
                        ? 'Wrong Network'
                        : !isOnL1
                          ? 'Switch to L1'
                          : liqStage === 'approving'
                            ? 'Approving…'
                            : liqStage === 'adding'
                              ? 'Adding…'
                              : liqStage === 'confirming'
                                ? 'Confirming…'
                                : 'Add Liquidity'}
                  </button>
                  {liqHash && (
                    <div className="notice">
                      Tx: <span className="mono">{liqHash}</span>
                    </div>
                  )}
                  {liqError && (
                    <div className="notice error">
                      <span className="error">{liqError}</span>
                    </div>
                  )}
                  <div className="notice">
                    Add liquidity works on L1. L2 swaps via Portal are still
                    WIP.
                  </div>
                </>
              )}
            </div>
          </section>

          {tokenModalOpen && (
            <TokenSelectModal
              onClose={() => setTokenModalOpen(false)}
              onSelect={handleSelectToken}
              selected={tokenModalSide === 'in' ? swapTokenIn : swapTokenOut}
              title={`Select a token (${tokenModalSide === 'in' ? 'input' : 'output'})`}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function ChainMenu() {
  const account = useAccount()
  const { switchChainAsync, chains, status, error } = useSwitchChain()
  const [open, setOpen] = useState(false)

  const availableChains = useMemo(() => {
    const ids = new Set(chains.map((c) => c.id))
    return CHAINS.filter((c) => ids.has(c.id))
  }, [chains])

  const active = useMemo(() => {
    return availableChains.find((c) => c.id === account.chainId)
  }, [account.chainId, availableChains])

  const ensureWalletHasChain = async (chainId: number) => {
    const ethereum = (window as any)?.ethereum as
      | { request?: (args: any) => Promise<any> }
      | undefined
    if (!ethereum?.request) return
    const chain = availableChains.find((c) => c.id === chainId)
    if (!chain) return
    const hexChainId = `0x${chainId.toString(16)}`
    const rpcUrl = chain.rpcUrls.default.http[0]
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: hexChainId,
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: [rpcUrl],
        },
      ],
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      <button className="btn" onClick={() => setOpen((v) => !v)} type="button">
        {active ? active.name : 'Select network'}
      </button>
      {open && (
        <div
          style={{
            background: 'rgba(20, 20, 28, 0.92)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18,
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            minWidth: 220,
            padding: 8,
            position: 'absolute',
            right: 0,
            top: 46,
            zIndex: 10,
          }}
        >
          {availableChains.map((chain) => (
            <button
              className="tokenRow"
              key={chain.id}
              onClick={() => {
                void (async () => {
                  setOpen(false)
                  if (!switchChainAsync) return
                  try {
                    await switchChainAsync({ chainId: chain.id })
                  } catch (err: any) {
                    const code = err?.code ?? err?.cause?.code
                    if (code === 4902) {
                      await ensureWalletHasChain(chain.id)
                      await switchChainAsync({ chainId: chain.id })
                      return
                    }
                    throw err
                  }
                })().catch((e) => {
                  console.error('Failed to switch chain', e)
                })
              }}
              type="button"
            >
              <span className="tokenIcon">{chain.name.slice(-1)}</span>
              <span className="tokenRowMeta">
                <span className="tokenRowSym">{chain.name}</span>
                <span className="tokenRowAddr">chainId: {chain.id}</span>
              </span>
            </button>
          ))}
          <div className="notice" style={{ marginTop: 6 }}>
            status: <span className="mono">{status}</span>
            {!account.isConnected ? (
              <>
                <br />
                Connect a wallet first to switch networks.
              </>
            ) : null}
            {error ? (
              <>
                <br />
                <span className="error">
                  {(error as any)?.shortMessage || (error as Error).message}
                </span>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

function TokenSelectModal(props: {
  title: string
  selected: TokenKey
  onClose: () => void
  onSelect: (key: TokenKey) => void
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      props.onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [props.onClose])

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tokenEntries().filter(([key, token]) => {
      if (!q) return true
      return (
        key.toLowerCase().includes(q) ||
        token.symbol.toLowerCase().includes(q) ||
        token.address.toLowerCase().includes(q)
      )
    })
  }, [query])

  return (
    <div className="modalBackdrop">
      <button
        aria-label="Close token selector"
        className="modalBackdropClickTarget"
        onClick={props.onClose}
        type="button"
      />
      <div aria-modal="true" className="modal" role="dialog">
        <div className="modalHeader">
          <div className="modalTitle">{props.title}</div>
          <button className="iconBtn" onClick={props.onClose} type="button">
            ✕
          </button>
        </div>

        <div className="search">
          <input
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or paste address"
            value={query}
          />
        </div>

        <div className="tokenList">
          {entries.map(([key, token]) => (
            <button
              className="tokenRow"
              key={key}
              onClick={() => props.onSelect(key)}
              type="button"
            >
              <span className="tokenIcon">{token.symbol.slice(0, 1)}</span>
              <span className="tokenRowMeta">
                <span className="tokenRowSym">
                  {token.symbol}{' '}
                  {key === props.selected ? (
                    <span className="muted">(selected)</span>
                  ) : null}
                </span>
                <span className="tokenRowAddr">
                  {shortAddress(token.address)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
