#!/bin/bash
# Start Porto development environment for Gwyneth Network

set -e

echo "🚀 Starting Porto Development for Gwyneth Network"
echo "================================================="
echo ""

# Check if Gwyneth is running
echo "Checking Gwyneth network..."
if ! curl -s -X POST http://localhost:32002 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' > /dev/null 2>&1; then
  echo "❌ Gwyneth network is not running on port 32002"
  echo "Please start your Gwyneth node first."
  exit 1
fi
echo "✅ Gwyneth network is running"
echo ""

# Check if contracts are deployed
if [ ! -f "config/gwyneth-addresses.json" ]; then
  echo "📦 Contracts not deployed yet. Deploying now..."
  pnpm tsx scripts/deploy-gwyneth.ts
  if [ $? -ne 0 ]; then
    echo "❌ Contract deployment failed"
    exit 1
  fi
else
  echo "✅ Contracts already deployed"
  cat config/gwyneth-addresses.json | jq '.contracts'
fi
echo ""

# Start relay in background
echo "🚀 Starting Porto Relay..."
USE_DOCKER_RELAY=true pnpm tsx scripts/relay-gwyneth.ts &
RELAY_PID=$!
echo "✅ Relay started (PID: $RELAY_PID)"

# Wait for relay to be ready
echo "Waiting for relay to be ready..."
sleep 5
for i in {1..30}; do
  if curl -s http://localhost:9119/health > /dev/null 2>&1; then
    echo "✅ Relay is ready"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "❌ Relay failed to start"
    kill $RELAY_PID 2>/dev/null
    exit 1
  fi
  sleep 1
done
echo ""

# Set environment variables for apps
export VITE_DIALOG_HOST="http://localhost:5175/dialog/"
export VITE_RELAY_URL="http://localhost:9119"
export VITE_CHAIN_ID="160010"
export VITE_CHAIN_NAME="Gwyneth"
export VITE_CHAIN_RPC="http://localhost:32002"

# Start the development servers
echo "🚀 Starting Porto applications..."
echo "   Dialog: http://localhost:5175/dialog"
echo "   ID App: http://localhost:5174"
echo "   Playground: http://localhost:5173"
echo ""

# Run pnpm dev with Gwyneth configuration
pnpm dev

# Cleanup on exit
trap "echo 'Shutting down...'; kill $RELAY_PID 2>/dev/null" EXIT