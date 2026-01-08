import { createConfig, http } from 'wagmi'
import { relay } from '../../../src/core/Mode.ts'
import { porto } from '../../../src/wagmi/index.ts'
import { gwyneth } from './gwyneth.ts'

export const relayUrl = 'http://localhost:9119'
export const rpcUrl = 'http://localhost:32002'

export const merchantUrl = (() => {
  const configured = import.meta.env.VITE_PORTO_MERCHANT_URL as
    | string
    | undefined
  if (configured && configured.length > 0) return configured
  if (typeof window !== 'undefined')
    return new URL('/porto/merchant', window.location.origin).toString()
  return '/porto/merchant'
})()

export const onboardUrl = merchantUrl.replace(/\/merchant\/?$/, '/onboard')

const webAuthn =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  navigator.credentials
    ? {
        async createFn(options?: CredentialCreationOptions) {
          if (!options) return null
          const publicKey = options.publicKey
          if (publicKey) {
            publicKey.authenticatorSelection = {
              ...publicKey.authenticatorSelection,
              authenticatorAttachment: 'platform',
              requireResidentKey: true,
              residentKey: 'required',
              userVerification: 'required',
            }
          }
          return navigator.credentials.create(options)
        },
        getFn: navigator.credentials.get.bind(navigator.credentials),
      }
    : undefined

export const config = createConfig({
  chains: [gwyneth],
  connectors: [
    porto({
      merchantUrl,
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
