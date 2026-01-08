import { porto } from 'porto/wagmi'
import { createConfig, http } from 'wagmi'
import { gwyneth } from '../../src/chains/gwyneth'

// Configuration for integrating with Gwyneth network
export const config = createConfig({
  chains: [gwyneth],
  connectors: [
    porto({
      // Optional: Custom dialog URL for local development
      dialogUrl: 'http://localhost:5175/dialog',
      // Optional: Custom relay URL for local development
      relayUrl: 'http://localhost:9119',

      // Optional: Custom theme
      theme: {
        accent: '#007AFF',
        background: '#FFFFFF',
        text: '#000000',
      },
    }),
  ],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [gwyneth.id]: http('http://localhost:32002'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
