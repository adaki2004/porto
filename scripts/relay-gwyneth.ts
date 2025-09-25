#!/usr/bin/env tsx
/**
 * Start Porto Relay for Gwyneth Network
 * 
 * This script updates the relay configuration with deployed contract addresses
 * and starts the relay service for Gwyneth network.
 */

import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse, stringify } from 'yaml'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.gwyneth' })

async function main() {
  console.log('🚀 Starting Porto Relay for Gwyneth Network')
  console.log('===========================================\n')

  // Check if contracts are deployed
  const addressesPath = resolve(import.meta.dirname, '../config/gwyneth-addresses.json')
  if (!existsSync(addressesPath)) {
    console.error('❌ Contracts not deployed yet!')
    console.error('Run "pnpm deploy:gwyneth" first to deploy the contracts.')
    process.exit(1)
  }

  // Load deployed addresses
  const addresses = JSON.parse(readFileSync(addressesPath, 'utf-8'))
  console.log('📋 Loading deployed contract addresses...')
  console.log(`   Chain ID: ${addresses.chainId}`)
  console.log(`   Deployed at: ${addresses.deployedAt}`)
  console.log()

  // Update relay configuration with deployed addresses
  const configPath = resolve(import.meta.dirname, '../config/relay-gwyneth.yaml')
  let config = parse(readFileSync(configPath, 'utf-8'))
  
  // Update contract addresses in config
  config.orchestrator = addresses.contracts.orchestrator
  config.delegation_proxy = addresses.contracts.accountProxy
  config.simulator = addresses.contracts.simulator
  config.funder = addresses.contracts.funder
  config.escrow = addresses.contracts.escrow

  const chainIdKey = String(addresses.chainId ?? process.env.GWYNETH_CHAIN_ID ?? '160010')
  const rpcForDocker =
    process.env.GWYNETH_RPC_URL_DOCKER
      || process.env.GWYNETH_RPC_URL
      || 'http://localhost:32002'

  const existingChainConfig = config.chains?.[chainIdKey] ?? {}
  config.chains = {
    [chainIdKey]: {
      ...existingChainConfig,
      endpoint: rpcForDocker,
    },
  }

  if (!config.transactions) config.transactions = {}
  if (!config.transactions.public_node_endpoints) {
    config.transactions.public_node_endpoints = {}
  }
  config.transactions.public_node_endpoints = {
    [chainIdKey]: rpcForDocker,
  }

  // Write updated configuration
  const updatedConfigPath = resolve(import.meta.dirname, '../config/relay-gwyneth-runtime.yaml')
  writeFileSync(updatedConfigPath, stringify(config))
  console.log('✅ Relay configuration updated with contract addresses')
  console.log(`   Config saved to: ${updatedConfigPath}`)
  console.log()

  // Check if we should use Docker or local relay
  const useDocker = process.env.USE_DOCKER_RELAY === 'true'
  
  const commonArgs = [
    '--config', useDocker ? '/app/config.yaml' : updatedConfigPath,
    '--skip-diagnostics',
    '--http.addr', '0.0.0.0',
    '--http.port', '9119',
    '--http.metrics-port', '9120',
    '--signers-mnemonic',
    process.env.RELAY_MNEMONIC
      || 'test test test test test test test test test test test junk',
    '--orchestrator', addresses.contracts.orchestrator,
    '--delegation-proxy', addresses.contracts.accountProxy,
    '--simulator', addresses.contracts.simulator,
    '--funder', addresses.contracts.funder,
    '--escrow', addresses.contracts.escrow,
    '--funder-signing-key',
    process.env.RELAY_FUNDER_SIGNER_KEY || process.env.DEPLOYER_PRIVATE_KEY || '',
    '--funder-owner-key',
    process.env.RELAY_FUNDER_OWNER_KEY || process.env.DEPLOYER_PRIVATE_KEY || '',
  ]

  if (useDocker) {
    console.log('🐳 Starting Relay with Docker...')

    const relayProcess = spawn(
      'docker',
      [
        'run',
        '--rm',
        '--name',
        'porto-relay-gwyneth',
        '-p',
        '9119:9119',
        '-p',
        '9120:9120',
        '-v',
        `${updatedConfigPath}:/app/config.yaml:ro`,
        'ghcr.io/ithacaxyz/relay:v24.0.8',
        ...commonArgs,
      ],
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          DOCKER_DEFAULT_PLATFORM:
            process.env.DOCKER_DEFAULT_PLATFORM || 'linux/amd64',
        },
      },
    )

    relayProcess.on('close', (code) => {
      console.log(`\nRelay process exited with code ${code}`)
      process.exit(code || 0)
    })
  } else {
    console.log('🚀 Starting Relay locally...')
    console.log('   Port: 9119')
    console.log('   Metrics: 9120')
    console.log('   Config: ' + updatedConfigPath)
    console.log()
    
    // Try to use local relay binary if available
    const relayBinary = process.env.RELAY_BINARY || 'relay'
    
    const relayProcess = spawn(relayBinary, commonArgs, {
      stdio: 'inherit',
      env: {
        ...process.env,
        RELAY_MNEMONIC: process.env.RELAY_MNEMONIC || 'test test test test test test test test test test test junk',
      }
    })

    relayProcess.on('error', (error) => {
      console.error('\n❌ Failed to start relay:', error.message)
      console.log('\nOptions to run the relay:')
      console.log('1. Use Docker: USE_DOCKER_RELAY=true pnpm relay:gwyneth')
      console.log('2. Install relay binary and set RELAY_BINARY=/path/to/relay')
      console.log('3. Use the Porto Docker setup')
      process.exit(1)
    })

    relayProcess.on('close', (code) => {
      console.log(`\nRelay process exited with code ${code}`)
      process.exit(code || 0)
    })
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down relay...')
    process.exit(0)
  })
}

main().catch((error) => {
  console.error('❌ Failed to start relay:', error)
  process.exit(1)
})
