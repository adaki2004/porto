import { relay } from '../../../src/core/Mode.ts'
import { porto } from '../../../src/wagmi/index.ts'
import { createConfig, http } from 'wagmi'
import { gwyneth } from './gwyneth.ts'

const relayUrl = 'http://localhost:9119'
const rpcUrl = 'http://localhost:32002'

const webAuthn =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  navigator.credentials
    ? {
        async createFn(options: CredentialCreationOptions) {
          const publicKey = options.publicKey
          if (publicKey) {
            publicKey.authenticatorSelection = {
              ...publicKey.authenticatorSelection,
              authenticatorAttachment: 'platform',
              requireResidentKey: true,
              residentKey: 'required',
              userVerification: 'required',
            }
            publicKey.userVerification = 'required'
          }
          return navigator.credentials.create(options)
        },
        getFn: navigator.credentials.get.bind(navigator.credentials) as any,
      }
    : undefined

export const config = createConfig({
  chains: [gwyneth],
  connectors: [
    porto({
      mode: relay({
        webAuthn,
      }),
      relay: http(relayUrl),
    }),
  ],
  multiInjectedProviderDiscovery: false,
  transports: {
    [gwyneth.id]: http(rpcUrl),
  },
})

export type AppConfig = typeof config
