import { defineChain } from 'viem'

export const gwyneth = defineChain({
  blockExplorers: {
    default: {
      name: 'Gwyneth Explorer',
      url: 'http://localhost:32002',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 0,
    },
  },
  id: 160010,
  name: 'Gwyneth',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  network: 'gwyneth',
  rpcUrls: {
    default: {
      http: ['http://localhost:32002'],
    },
    public: {
      http: ['http://localhost:32002'],
    },
  },
})
