#!/usr/bin/env bash
set -euo pipefail

RPC_URL=${GWYNETH_RPC_URL:-http://localhost:32002}
FUND_VALUE=${MERCHANT_FUND_VALUE:-1ether}
OUTPUT_FILE=${1:-examples/sponsoring-vite/.env}
RELAY_URL=${MERCHANT_RELAY_URL:-http://localhost:9119}
MERCHANT_API_URL=${VITE_PORTO_MERCHANT_URL:-http://localhost:8787/porto/merchant}
DEV_VARS_FILE="$(dirname "$OUTPUT_FILE")/.dev.vars"

if ! command -v cast >/dev/null 2>&1; then
  echo "cast is required (foundry)." >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required to parse cast output." >&2
  exit 1
fi

if [ -z "${DEPLOYER_PRIVATE_KEY:-}" ]; then
  echo "DEPLOYER_PRIVATE_KEY is not set. Export it or add it to .env.gwyneth." >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to talk to the relay." >&2
  exit 1
fi

info=$(cast wallet new --json | jq '.[0] // .')
merchant_address=$(echo "$info" | jq -r '.address')
merchant_private=$(echo "$info" | jq -r '.private // .private_key')

if [ -z "$merchant_address" ] || [ -z "$merchant_private" ]; then
  echo "Failed to parse merchant credentials from cast output." >&2
  exit 1
fi

cast send \
  --rpc-url "$RPC_URL" \
  --private-key "$DEPLOYER_PRIVATE_KEY" \
  "$merchant_address" \
  --value "$FUND_VALUE"

echo "MERCHANT_ADDRESS=$merchant_address" > "$OUTPUT_FILE"
echo "MERCHANT_PRIVATE_KEY=$merchant_private" >> "$OUTPUT_FILE"
echo "MERCHANT_RELAY_URL=$RELAY_URL" >> "$OUTPUT_FILE"
echo "VITE_PORTO_MERCHANT_URL=$MERCHANT_API_URL" >> "$OUTPUT_FILE"

echo "Merchant address: $merchant_address"
echo "Credentials written to $OUTPUT_FILE"

# Wrangler reads `.dev.vars` automatically for `wrangler dev`; keep it in sync so
# we don't have to pass `--var ...` manually.
echo "MERCHANT_ADDRESS=$merchant_address" > "$DEV_VARS_FILE"
echo "MERCHANT_PRIVATE_KEY=$merchant_private" >> "$DEV_VARS_FILE"
echo "MERCHANT_RELAY_URL=$RELAY_URL" >> "$DEV_VARS_FILE"
echo "Wrangler dev vars written to $DEV_VARS_FILE"

echo "Registering sponsor in relay storage (wallet_prepareUpgradeAccount + wallet_upgradeAccount)..."

chain_id_hex=$(cast rpc --rpc-url "$RPC_URL" eth_chainId | tr -d '"')
chain_id_dec=$(cast to-dec "$chain_id_hex")

# `publicKey` for secp256k1 keys is the EOA address left-padded to bytes32.
merchant_pubkey="0x000000000000000000000000${merchant_address#0x}"

capabilities_json=$(curl -sS -X POST -H 'Content-Type: application/json' \
  --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_getCapabilities\",\"params\":[[$chain_id_dec]]}" \
  "$RELAY_URL")

delegation_proxy=$(echo "$capabilities_json" | jq -r ".result[\"$chain_id_hex\"].contracts.accountProxy.address")
if [ -z "$delegation_proxy" ] || [ "$delegation_proxy" = "null" ]; then
  echo "Failed to resolve delegation proxy from relay capabilities (chain_id=$chain_id_hex)." >&2
  echo "$capabilities_json" >&2
  exit 1
fi

prep_json=$(curl -sS -X POST -H 'Content-Type: application/json' \
  --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_prepareUpgradeAccount\",\"params\":[{\"address\":\"$merchant_address\",\"delegation\":\"$delegation_proxy\",\"chainId\":$chain_id_dec,\"capabilities\":{\"authorizeKeys\":[{\"expiry\":0,\"type\":\"secp256k1\",\"role\":\"admin\",\"publicKey\":\"$merchant_pubkey\",\"permissions\":[]}]}}]}" \
  "$RELAY_URL")

auth_digest=$(echo "$prep_json" | jq -r '.result.digests.auth')
exec_digest=$(echo "$prep_json" | jq -r '.result.digests.exec')
context_json=$(echo "$prep_json" | jq -c '.result.context')

if [ -z "$auth_digest" ] || [ "$auth_digest" = "null" ] || [ -z "$exec_digest" ] || [ "$exec_digest" = "null" ]; then
  echo "Relay did not return upgrade digests." >&2
  echo "$prep_json" >&2
  exit 1
fi

auth_sig=$(cast wallet sign --no-hash --private-key "$merchant_private" "$auth_digest")
exec_sig=$(cast wallet sign --no-hash --private-key "$merchant_private" "$exec_digest")

upgrade_json=$(curl -sS -X POST -H 'Content-Type: application/json' \
  --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_upgradeAccount\",\"params\":[{\"context\":$context_json,\"signatures\":{\"auth\":\"$auth_sig\",\"exec\":\"$exec_sig\"}}]}" \
  "$RELAY_URL")

if echo "$upgrade_json" | jq -e '.error' >/dev/null; then
  echo "Relay wallet_upgradeAccount failed:" >&2
  echo "$upgrade_json" >&2
  exit 1
fi

echo "Broadcasting sponsor onboarding tx (EIP-7702 + Orchestrator pre-call)..."

# We need the relay to provide the exact calldata to execute the pre-call against the
# Orchestrator. This initializes the sponsor's onchain account state (keys/permissions).
auth_tx_json=$(curl -sS -X POST -H 'Content-Type: application/json' \
  --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_getAuthorization\",\"params\":[{\"address\":\"$merchant_address\"}]}" \
  "$RELAY_URL")

if echo "$auth_tx_json" | jq -e '.error' >/dev/null; then
  echo "Relay wallet_getAuthorization failed:" >&2
  echo "$auth_tx_json" >&2
  exit 1
fi

auth_to=$(echo "$auth_tx_json" | jq -r '.result.to // empty')
auth_data=$(echo "$auth_tx_json" | jq -r '.result.data // empty')
if [[ -z "$auth_to" || -z "$auth_data" || "$auth_to" == "null" || "$auth_data" == "null" ]]; then
  echo "Relay wallet_getAuthorization returned empty tx fields:" >&2
  echo "$auth_tx_json" >&2
  exit 1
fi

auth_list=$(
  cast wallet sign-auth \
    --private-key "$merchant_private" \
    --nonce 0 \
    --chain 0 \
    "$delegation_proxy"
)

cast send \
  --rpc-url "$RPC_URL" \
  --private-key "$DEPLOYER_PRIVATE_KEY" \
  --gas-price "${MERCHANT_DELEGATION_GAS_PRICE:-1gwei}" \
  --priority-gas-price "${MERCHANT_DELEGATION_PRIORITY_GAS_PRICE:-1gwei}" \
  --gas-limit "${MERCHANT_DELEGATION_GAS_LIMIT:-5000000}" \
  --auth "$auth_list" \
  "$auth_to" \
  "$auth_data" \
  --value 0 \
  >/dev/null

echo "Waiting for sponsor delegation to be visible onchain..."
delegation_seen=false
for _ in $(seq 1 30); do
  code_hex=$(cast rpc --rpc-url "$RPC_URL" eth_getCode "$merchant_address" latest | tr -d '"')
  # EIP-7702 delegated accounts return code starting with 0xef0100 + delegate address.
  if [[ "$code_hex" == 0xef0100* ]]; then
    delegation_seen=true
    break
  fi
  sleep 1
done

if [ "$delegation_seen" != true ]; then
  echo "Sponsor delegation did not appear onchain after onboarding tx." >&2
  echo "Last eth_getCode: $code_hex" >&2
  echo "Try: curl -s http://127.0.0.1:9119/health and rerun setup-merchant.sh" >&2
  exit 1
fi

echo "Relay storage updated for sponsor $merchant_address"
