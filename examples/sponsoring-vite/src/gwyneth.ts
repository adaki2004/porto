import { defineChain } from 'viem'

export const gwyneth = defineChain({
  id: 160010,
  name: 'Gwyneth',
  network: 'gwyneth',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:32002'],
    },
    public: {
      http: ['http://localhost:32002'],
    },
  },
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
})
