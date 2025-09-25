# Porto ↦ Gwyneth Deployment Cookbook

This walks through the exact steps we followed on this machine to deploy Porto, start the relay, and submit a test AA transaction against the local **Gwyneth** L1 (chain ID `160010`).

---

## 0. Prerequisites & One‑Time Setup

- Gwyneth node listening on `http://localhost:32002` and a funded deployer account.  
  _(The deployment scripts use `DEPLOYER_PRIVATE_KEY` from `.env.gwyneth`.)_
- Node.js ≥ 22.5 and pnpm ≥ 10 available via `nvm`.  
  `source ~/.nvm/nvm.sh && nvm use 22.19.0`
- Docker Desktop running (for the relay container).
- Project dependencies installed once via `pnpm install`.
- Environment file `.env.gwyneth` present with deployer key, relay mnemonic, etc.

### Helper Script

The repo now ships a convenience script, `scripts/setup-gwyneth-relay.sh`, that:

1. Validates the Gwyneth RPC endpoint.
2. Reads deployment addresses from `config/gwyneth-addresses.json`.
3. Registers the orchestrator and relay signers with `SimpleFunder`.
4. Prefunds all signer EOAs with 0.1 ETH (configurable).

Run after contract deployment and any time you need to reset signer state:

```bash
./scripts/setup-gwyneth-relay.sh
```

The script expects `DEPLOYER_PRIVATE_KEY` in the environment and defaults the signer mnemonic to the repo’s shared value (`test test … junk`).

---

## 1. Select Node 22 for the session

```bash
cd /Users/keszeyd/work/porto/porto
source ~/.nvm/nvm.sh
nvm use 22.19.0
```

You can export `NODE_OPTIONS="--disable-warning=ExperimentalWarning --disable-warning=DeprecationWarning"` if you want parity with the repo’s `.npmrc`, but it is optional for the commands below.

---

## 2. Deploy Porto contracts to Gwyneth

```bash
pnpm deploy:gwyneth
```

What happens:

- Orchestrator, account implementation/proxy, simulator, escrow, settler, SimpleFunder, Multicall3, and demo tokens are deployed.
- `config/gwyneth-addresses.json` captures the addresses (deterministic) and `src/chains/gwyneth-contracts.ts` exports types for the SDK.
- SimpleFunder is automatically topped up with 10 ETH.

If you re-run, the script detects already deployed contracts and will skip/notify accordingly.

---

## 3. Prepare relay prerequisites (one-time)

Use the helper script mentioned above, or execute the manual steps listed here for reference:

```bash
# 3.1 Authorise the Orchestrator in SimpleFunder
cast send \
  --rpc-url http://localhost:32002 \
  --private-key $DEPLOYER_PRIVATE_KEY \
  0xcc97bb833f9d361fd8f65e02ba4b8413e1e0ae0d \
  "setOrchestrators(address[],bool)" "[0x6db20c530b3f96cd5ef64da2b1b931cb8f264009]" true

# 3.2 Whitelist the relay signer EOAs as gas wallets
MNEMONIC="test test test test test test test test test test test junk"
SIGNERS=$(./scripts/setup-gwyneth-relay.sh --mnemonic "$MNEMONIC" --print-signers)

cast send \
  --rpc-url http://localhost:32002 \
  --private-key $DEPLOYER_PRIVATE_KEY \
  0xcc97bb833f9d361fd8f65e02ba4b8413e1e0ae0d \
  "setGasWallet(address[],bool)" "[$SIGNERS]" true

# 3.3 Prefund signer EOAs so they can reimburse the relay the first time it boots
./scripts/setup-gwyneth-relay.sh --prefund 0.1
```

Both the script and the manual commands mirror what the Docker `run.sh` bootstrapper does for the Anvil preset.

---

## 4. Launch the Porto relay (Docker)

```bash
USE_DOCKER_RELAY=true pnpm relay:gwyneth
```

Key points:

- The script now autogenerates `config/relay-gwyneth-runtime.yaml` with numeric chain key `"160010"` and Docker-friendly RPC (`host.docker.internal`).
- It passes `--skip-diagnostics` because the generic diagnostics expect a multicall contract. If you later deploy a Multicall3 to `0xcA11bde05977b3631167028862bE2a173976CA11`, you can remove that switch.
- Relay logs are JSON. Inspect them with `docker logs -f porto-relay-gwyneth` in another terminal.

**Ray of caution:** the relay exits when `DEPLOYER_PRIVATE_KEY` is empty, so keep `.env.gwyneth` in place.

---

## 5. Run the sample Wagmi + Porto app

The repo already contains `examples/sponsoring-vite`, which demonstrates Wagmi integration. Use the same Node 22 shell:

```bash
pnpm --filter sponsoring-vite dev
```

You’ll see Vite on `http://localhost:4173` (or the port Vite reports). The UI exposes buttons to:

1. Connect (creates a smart account against Gwyneth).
2. Send a “noop” transaction (UserOperation via the relay’s API).

Watch the relay logs to confirm it bundles the UserOperation and the Gwyneth node for the L1 tx hash.

> If you see engine warnings like `Unsupported engine: wanted >=22.5`, you are most likely in a Node 20 shell. Re-run `nvm use 22.19.0` before the `pnpm` command.

---

## 6. Optional verification steps

- Confirm contracts with `cast code` on the addresses from `config/gwyneth-addresses.json`.
- Hit the relay health endpoint: `curl http://localhost:9119/health`.
- Use `cast chain-id --rpc-url http://localhost:32002` to double-check the chain.

### Debugging Status – `PreCallVerificationError`

- **Symptom:** `wallet_upgradeAccount` returns `execution reverted: 0x6ac5b32f (PreCallVerificationError)` from the Orchestrator when creating a fresh account through the relay.
- **Root Cause (current understanding):** The WebAuthn signatures generated by the headless/mock flow don’t satisfy `IthacaAccount.unwrapAndValidateSignature`, so the Orchestrator aborts before the account is created. When using the real Dialog + WebAuthn flow we see valid FIDO responses, but Gwyneth still reverts with the same error, indicating the pre-call signature or metadata is not fully compatible with the on-chain verifier.
- **Next Steps for Follow-up:**
  1. Capture the failing bundle (context + signatures) from the relay logs and reproduce via `cast call` (already done in current session).
  2. Inspect the WebAuthn payload produced by the browser and compare with the contract’s expectations (`WebAuthn.verify`).
  3. Confirm whether Gwyneth’s execution layer is propagating the EIP-7702 authorization correctly (initial poking shows it is, the revert occurs inside `unwrapAndValidateSignature`).
  4. Coordinate with the Porto team on mock/real WebAuthn support or adjust the signing helpers to match on-chain verification.

---

## 7. Tear-down

- `Ctrl+C` stops the Vite dev server.
- `Ctrl+C` stops the relay script (which also stops the Docker container).
- Gwyneth stays running separately—stop it manually when needed.

You now have a reproducible checklist for bringing up Porto on your Gwyneth network and manually testing AA transactions with a minimal UI.
