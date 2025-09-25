# Porto Architecture & Execution Flow

This document captures how Porto works end-to-end so you do not have to reverse-engineer the deployment scripts every time.

## 1. High-Level Overview

Porto is a full ERC-4337-style Account Abstraction stack built around three pillars:

1. **Smart Contract Accounts (SCA)** deployed on the target chain.
2. **Porto Relay** – an off-chain coordinator that simulates, sponsors and bundles UserOperations.
3. **Client SDK** – typed bindings (Viem/Wagmi) plus a Dialog UI that hides key-management behind WebAuthn.

```
User ↔ Dialog (WebAuthn) ↔ Porto SDK ↔ Relay ↔ Chain (SCA contracts)
```

The relay holds a hot signer to pay gas for bundles; the smart contracts enforce permissions and repay the relay from the `SimpleFunder` treasury.

## 2. Smart-Contract Layer

| Contract | Purpose |
|----------|---------|
| `Orchestrator` | Verifies UserOps, enforces permissions, and dispatches target calls. Integrates EIP-7702 for delegation.
| `IthacaAccount` | The actual account logic (proxy implementation). Handles multi-key permissions, WebAuthn validation, and execution.
| `EIP7702Proxy` | Delegation proxy that forwards calls to the implementation while allowing upgrades via EIP-7702 authorizations.
| `SimpleFunder` | Holds ETH (or other tokens) used to reimburse the relay’s hot signer. Also acts as Paymaster.
| `SimpleSettler`, `Escrow` | Optional settlement helpers for cross-chain or deferred payments.
| `Simulator` | Lightweight on-chain simulator used during gas estimation.
| Demo tokens (`ExperimentERC20`, `ExperimentERC721`) | Optional assets for testing.

All contracts are deployed deterministically and their addresses are recorded in `config/<chain>-addresses.json`.

### 2.1 Account Initialization (Upgrade Flow)

Account creation is modelled as an upgrade from a cold EOA:

1. SDK generates a fresh private key (or WebAuthn credential) for the user.
2. `wallet_prepareUpgradeAccount` builds a pre-call bundle that authorizes admin/session keys and records an EIP-7702 authorization pointing the EOA at `EIP7702Proxy`.
3. The user signs the bundle (WebAuthn / secp256k1).
4. Relay calls `wallet_upgradeAccount`, which verifies the signatures, stores the pre-call, and broadcasts the bundle through the Orchestrator.

After this step the user controls a smart account instead of the naked EOA.

## 3. Relay Service

The relay is a Rust binary (ghcr.io/ithacaxyz/relay). It exposes JSON-RPC methods under port `9119`.

Key responsibilities:

- **Capability Discovery** – reports deployed contract addresses and supported features per chain via `wallet_getCapabilities`.
- **Simulation** – runs `eth_call`/`eth_feeHistory` against the configured RPC to ensure UserOps succeed.
- **Bundling** – wraps signed operations into an L1 transaction, using the relay signer (derived from `RELAY_MNEMONIC`).
- **Gas Sponsorship** – interacts with `SimpleFunder` to top-up the relay signer when balance runs low.

Configuration is read from YAML (see `config/relay-gwyneth.yaml`); the runtime script rewrites it into `config/relay-gwyneth-runtime.yaml` with actual addresses and RPC endpoints.

## 4. Client SDK

Two layers exist:

1. **Core SDK (`porto`)** – provides Mode abstractions (`dialog`, `relay`), key management, storage, and JSON-RPC client.
2. **Wagmi/Viem connectors** – drop-in connectors for app integration.

A typical Wagmi setup looks like:

```ts
import { createConfig, http } from 'wagmi'
import { porto } from 'porto/wagmi'
import { relay } from 'porto/core/Mode'
import { gwyneth } from './gwyneth-chain'

export const config = createConfig({
  chains: [gwyneth],
  connectors: [
    porto({
      mode: relay(),
      relay: http('http://localhost:9119'),
    }),
  ],
  transports: {
    [gwyneth.id]: http('http://localhost:32002'),
  },
})
```

From there you can call `useConnect`, `useSendCalls`, etc. The connector hides WebAuthn prompts and automatically initializes the smart account if it does not exist yet.

### 4.1 Modes

- `Mode.dialog()` – uses the hosted Dialog UI (iframe) and WebAuthn in the browser. Great for production UX.
- `Mode.relay({ webAuthn })` – direct relay access. You can supply custom `createFn/getFn` to integrate with native environments.
- Mock mode (`{ mock: true }`) – generates headless keys. Useful in tests, but note that the generated WebAuthn payloads may not pass on-chain validation on all chains.

## 5. Execution Flow

1. **Application** calls `connect()`.
2. SDK requests capabilities from the relay, fetches deployed contract addresses, and constructs the account context.
3. SDK creates or retrieves WebAuthn credentials, signs the upgrade bundle, and sends it to `wallet_upgradeAccount`.
4. Relay validates signatures, stores precall data, and broadcasts via `SimpleFunder` → `Orchestrator` → `IthacaAccount`.
5. `SimpleFunder` reimburses the relay signer, preventing gas-loss.

## 6. Operational Notes

- Relay signer addresses are derived from `RELAY_MNEMONIC`. Register them as gas wallets via the helper script.
- Keep an eye on the relay logs (`docker logs -f porto-relay-gwyneth`). All JSON entries include method names and RPCs being touched.
- Health endpoint: `curl http://localhost:9119/health`.
- Current known issue: `PreCallVerificationError` when mocking WebAuthn signatures (see runbook). Always prefer real WebAuthn flows in production.

## 7. Useful Commands

```bash
# Verify orchestrator bytecode
cast code --rpc-url $GWYNETH_RPC_URL 0x6db20c530b3f96cd5ef64da2b1b931cb8f264009

# Query relay capabilities
curl -s http://localhost:9119 -X POST \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"wallet_getCapabilities"}'

# Simulate a failing precall directly (returns revert data)
cast call --rpc-url $GWYNETH_RPC_URL 0x6db20c530b3f96cd5ef64da2b1b931cb8f264009 \
  "executePreCalls(address,(address,bytes,uint256,bytes)[])" <parent> <preCallArray>
```

This document should give future sessions enough context to reason about Porto’s moving parts without diving into the code base immediately.
