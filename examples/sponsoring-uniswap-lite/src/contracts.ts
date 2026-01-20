import type { Address } from 'viem'

export type UniswapDeployment = 'l1_deterministic' | 'l1_l2a_matched'

export const UNISWAP_DEPLOYMENT: UniswapDeployment =
  (import.meta.env.VITE_UNISWAP_DEPLOYMENT as UniswapDeployment | undefined) ??
  'l1_deterministic'

export const UNISWAP_V2_L1_DETERMINISTIC = {
  // Deterministic L1-only Uniswap deployment set.
  // Source of truth: `COOKBOOK_BIOMETRIC_UNISWAP.md` (Uniswap section).
  factory:
    '0x4d2caEe76BAb8dDE0717Cba05304aB99A76f7dcF' as const satisfies Address,
  multicall:
    '0x94a61f523ea1763d8D441Ae2f0811C04a889a7EF' as const satisfies Address,
  portal:
    '0x2eC0cE30c885E67d27a3801297854B703047f17c' as const satisfies Address,
  router02:
    '0x81AD261779F07B5F5F8914A3C5Ea929Cec9c168c' as const satisfies Address,
  weth9:
    '0x12BEFBCED4fCC6c2b854d34c7e0906F50143EDff' as const satisfies Address,
} as const

export const UNISWAP_V2_L1_L2A_MATCHED = {
  // Matched-address L1+L2A deployment set (required for Portal cross-swap calls from L2A).
  // Source of truth: `COOKBOOK_BIOMETRIC_UNISWAP_UI_PLAN.md` (Deployment Set B).
  factory:
    '0xc2bce8458263dcEA0fd55794947C48B40C8666BB' as const satisfies Address,
  // Uniswap Multicall is deployed on L1 in the deterministic set; it is not available on L2 by default.
  multicall:
    '0x94a61f523ea1763d8D441Ae2f0811C04a889a7EF' as const satisfies Address,
  portal:
    '0x43f97079383F5cB102C595b93515Dd37Afc9afF6' as const satisfies Address,
  router02:
    '0x2fC9ED7C202eE55B5cea755f2fe3589E19534A44' as const satisfies Address,
  weth9:
    '0x85CE478753455F75E5F42B3df0fB8536B45BDfAf' as const satisfies Address,
} as const

export const UNISWAP_V2 =
  UNISWAP_DEPLOYMENT === 'l1_l2a_matched'
    ? UNISWAP_V2_L1_L2A_MATCHED
    : UNISWAP_V2_L1_DETERMINISTIC

export const TOKENS_L1_DETERMINISTIC = {
  CHEESE: {
    address:
      '0xe7a62ae99A4AFf6d389233720352e3379F2Be251' as const satisfies Address,
    decimals: 18,
    name: 'Cheese',
    symbol: 'CHEESE',
  },
  SLOTH: {
    address:
      '0xDE68f4ED350A914c2d9279d4bc38A4549A41c5d1' as const satisfies Address,
    decimals: 18,
    name: 'Sloth',
    symbol: 'SLOTH',
  },
  TAIKO: {
    address:
      '0x497664eD3164Ff894CEdDB28C24C181e830C621f' as const satisfies Address,
    decimals: 18,
    name: 'Taiko',
    symbol: 'TAIKO',
  },
} as const

export const TOKENS_L1_L2A_MATCHED = {
  CHEESE: {
    address:
      '0x719136acc408b33D73b15EF5d0e7CF674eB7eb7b' as const satisfies Address,
    decimals: 18,
    name: 'Cheese',
    symbol: 'CHEESE',
  },
  SLOTH: {
    address:
      '0xDE68f4ED350A914c2d9279d4bc38A4549A41c5d1' as const satisfies Address,
    decimals: 18,
    name: 'Sloth',
    symbol: 'SLOTH',
  },
  TAIKO: {
    address:
      '0x24EB1A0EE9248F0A72c1cB8ef1c493F633392E13' as const satisfies Address,
    decimals: 18,
    name: 'Taiko',
    symbol: 'TAIKO',
  },
} as const

export const TOKENS =
  UNISWAP_DEPLOYMENT === 'l1_l2a_matched'
    ? TOKENS_L1_L2A_MATCHED
    : TOKENS_L1_DETERMINISTIC

export type TokenKey = keyof typeof TOKENS_L1_DETERMINISTIC

export const erc20Abi = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'chain', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'xTransfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const uniswapV2FactoryAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const uniswapV2PairAbi = [
  {
    inputs: [],
    name: 'getReserves',
    outputs: [
      { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
      { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
      { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const uniswapV2Router02Abi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
    ],
    name: 'getAmountsOut',
    outputs: [
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
      { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
      { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
      { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
      { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const uniswapPortalAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const

export const uniswapMulticallAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct Multicall.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
