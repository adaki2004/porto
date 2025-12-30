import { defineChain } from 'viem'

export const gwyneth = defineChain({
  blockExplorers: {
    default: {
      name: 'Gwyneth Explorer',
      url: 'http://localhost:32002',
    },
  },
  id: 160010,
  name: 'Gwyneth',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:32002'],
    },
  },
  testnet: false,
})
