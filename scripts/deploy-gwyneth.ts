#!/usr/bin/env tsx
/**
 * Deploy Porto contracts to Gwyneth L1 Network
 *
 * This script deploys all necessary Porto contracts to your local Gwyneth network
 * and sets up the initial state for development.
 */

import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { type Address, Value } from 'ox'
import { spawnSync } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.gwyneth' })

// Import contract ABIs and bytecode
import * as EIP7702Proxy from '../src/core/internal/_generated/contracts/EIP7702Proxy.js'
import * as Escrow from '../src/core/internal/_generated/contracts/Escrow.js'
import * as IthacaAccount from '../src/core/internal/_generated/contracts/IthacaAccount.js'
import * as Orchestrator from '../src/core/internal/_generated/contracts/Orchestrator.js'
import * as ExperimentERC20 from '../src/core/internal/_generated/contracts/ExperimentERC20.js'
import * as ExperimentERC721 from '../src/core/internal/_generated/contracts/ExperimentERC721.js'
import * as SimpleSettler from '../src/core/internal/_generated/contracts/SimpleSettler.js'
import * as SimpleFunder from '../src/core/internal/_generated/contracts/SimpleFunder.js'
import * as Simulator from '../src/core/internal/_generated/contracts/Simulator.js'

// Gwyneth chain configuration
const gwyneth = {
  id: 160010,
  name: 'Gwyneth',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:32002'],
    },
  },
}

const MULTICALL3_ADDRESS =
  '0xcA11bde05977b3631167028862bE2a173976CA11' as Address.Address
const MULTICALL3_DEPLOYER =
  '0x05f32B3cC3888453ff71B01135B34FF8e41263F2' as Address.Address
const MULTICALL3_SIGNED_TX =
  '0xf90f538085174876e800830f42408080b90f00608060405234801561001057600080fd5b50610ee0806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e1461025a578063bce38bd714610275578063c3077fa914610288578063ee82ac5e1461029b57600080fd5b80634d2301cc146101ec57806372425d9d1461022157806382ad56cb1461023457806386d516e81461024757600080fd5b80633408e470116100c65780633408e47014610191578063399542e9146101a45780633e64a696146101c657806342cbb15c146101d957600080fd5b80630f28c97d146100f8578063174dea711461011a578063252dba421461013a57806327e86d6e1461015b575b600080fd5b34801561010457600080fd5b50425b6040519081526020015b60405180910390f35b61012d610128366004610a85565b6102ba565b6040516101119190610bbe565b61014d610148366004610a85565b6104ef565b604051610111929190610bd8565b34801561016757600080fd5b50437fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0140610107565b34801561019d57600080fd5b5046610107565b6101b76101b2366004610c60565b610690565b60405161011193929190610cba565b3480156101d257600080fd5b5048610107565b3480156101e557600080fd5b5043610107565b3480156101f857600080fd5b50610107610207366004610ce2565b73ffffffffffffffffffffffffffffffffffffffff163190565b34801561022d57600080fd5b5044610107565b61012d610242366004610a85565b6106ab565b34801561025357600080fd5b5045610107565b34801561026657600080fd5b50604051418152602001610111565b61012d610283366004610c60565b61085a565b6101b7610296366004610a85565b610a1a565b3480156102a757600080fd5b506101076102b6366004610d18565b4090565b60606000828067ffffffffffffffff8111156102d8576102d8610d31565b60405190808252806020026020018201604052801561031e57816020015b6040805180820190915260008152606060208201528152602001906001900390816102f65790505b5092503660005b8281101561047757600085828151811061034157610341610d60565b6020026020010151905087878381811061035d5761035d610d60565b905060200281019061036f9190610d8f565b6040810135958601959093506103886020850185610ce2565b73ffffffffffffffffffffffffffffffffffffffff16816103ac6060870187610dcd565b6040516103ba929190610e32565b60006040518083038185875af1925050503d80600081146103f7576040519150601f19603f3d011682016040523d82523d6000602084013e6103fc565b606091505b50602080850191909152901515808452908501351761046d577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b5050600101610325565b508234146104e6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f4d756c746963616c6c333a2076616c7565206d69736d6174636800000000000060448201526064015b60405180910390fd5b50505092915050565b436060828067ffffffffffffffff81111561050c5761050c610d31565b60405190808252806020026020018201604052801561053f57816020015b606081526020019060019003908161052a5790505b5091503660005b8281101561068657600087878381811061056257610562610d60565b90506020028101906105749190610e42565b92506105836020840184610ce2565b73ffffffffffffffffffffffffffffffffffffffff166105a66020850185610dcd565b6040516105b4929190610e32565b6000604051808303816000865af19150503d80600081146105f1576040519150601f19603f3d011682016040523d82523d6000602084013e6105f6565b606091505b5086848151811061060957610609610d60565b602090810291909101015290508061067d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060448201526064016104dd565b50600101610546565b5050509250929050565b43804060606106a086868661085a565b905093509350939050565b6060818067ffffffffffffffff8111156106c7576106c7610d31565b60405190808252806020026020018201604052801561070d57816020015b6040805180820190915260008152606060208201528152602001906001900390816106e55790505b5091503660005b828110156104e657600084828151811061073057610730610d60565b6020026020010151905086868381811061074c5761074c610d60565b905060200281019061075e9190610e76565b925061076d6020840184610ce2565b73ffffffffffffffffffffffffffffffffffffffff166107906040850185610dcd565b60405161079e929190610e32565b6000604051808303816000865af19150503d80600081146107db576040519150601f19603f3d011682016040523d82523d6000602084013e6107e0565b606091505b506020808401919091529015158083529084013517610851577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b50600101610714565b6060818067ffffffffffffffff81111561087657610876610d31565b6040519080825280602002602001820160405280156108bc57816020015b6040805180820190915260008152606060208201528152602001906001900390816108945790505b5091503660005b82811015610a105760008482815181106108df576108df610d60565b602002602001015190508686838181106108fb576108fb610d60565b905060200281019061090d9190610e42565b925061091c6020840184610ce2565b73ffffffffffffffffffffffffffffffffffffffff1661093f6020850185610dcd565b60405161094d929190610e32565b6000604051808303816000865af19150503d806000811461098a576040519150601f19603f3d011682016040523d82523d6000602084013e61098f565b606091505b506020830152151581528715610a07578051610a07576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060448201526064016104dd565b506001016108c3565b5050509392505050565b6000806060610a2b60018686610690565b919790965090945092505050565b60008083601f840112610a4b57600080fd5b50813567ffffffffffffffff811115610a6357600080fd5b6020830191508360208260051b8501011115610a7e57600080fd5b9250929050565b60008060208385031215610a9857600080fd5b823567ffffffffffffffff811115610aaf57600080fd5b610abb85828601610a39565b90969095509350505050565b6000815180845260005b81811015610aed57602081850181015186830182015201610ad1565b81811115610aff576000602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600082825180855260208086019550808260051b84010181860160005b84811015610bb1578583037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe001895281518051151584528401516040858501819052610b9d81860183610ac7565b9a86019a9450505090830190600101610b4f565b5090979650505050505050565b602081526000610bd16020830184610b32565b9392505050565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b82811015610c52577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0888703018452610c40868351610ac7565b95509284019290840190600101610c06565b509398975050505050505050565b600080600060408486031215610c7557600080fd5b83358015158114610c8557600080fd5b9250602084013567ffffffffffffffff811115610ca157600080fd5b610cad86828701610a39565b9497909650939450505050565b838152826020820152606060408201526000610cd96060830184610b32565b95945050505050565b600060208284031215610cf457600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610bd157600080fd5b600060208284031215610d2a57600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81833603018112610dc357600080fd5b9190910192915050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610e0257600080fd5b83018035915067ffffffffffffffff821115610e1d57600080fd5b602001915036819003821315610a7e57600080fd5b8183823760009101908152919050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc1833603018112610dc357600080fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa1833603018112610dc357600080fdfea2646970667358221220bb2b5c71a328032f97c676ae39a1ec2148d3e5d6f73d95e9b17910152d61f16264736f6c634300080c00331ca0edce47092c0f398cebf3ffc267f05c8e7076e3b89445e0fe50f6332273d4569ba01b0b9d000e19b24c5869b0fc3b22b0d6fa47cd63316875cbbd577d76e6fde086' as `0x${string}`
const MULTICALL3_TARGET_BALANCE = 200000000000000000n
const MULTICALL3_MIN_BALANCE = 100000000000000000n
// Some Porto deployments (notably `IthacaAccount`) are large enough that a 5M gas
// cap can silently produce a reverted deployment with a contract address but no
// code. Keep this comfortably below the devnet block gas limit but high enough
// to avoid that failure mode.
const DEPLOYMENT_GAS_LIMIT = 12_000_000n
const VALUE_TRANSFER_GAS_LIMIT = 200_000n
const TX_CONFIRM_TIMEOUT_MS = 5 * 60 * 1000

// Deployment configuration from environment
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY
const RPC_URL = process.env.GWYNETH_RPC_URL || 'http://localhost:32002'
const DEPLOY_DEMO_TOKENS = process.env.DEPLOY_DEMO_TOKENS === 'true'

async function main() {
  console.log('🚀 Deploying Porto to Gwyneth Network')
  console.log('=====================================')
  console.log(`Chain ID: ${gwyneth.id}`)
  console.log(`RPC URL: ${RPC_URL}`)
  console.log()

  if (!DEPLOYER_PRIVATE_KEY) {
    console.error('❌ DEPLOYER_PRIVATE_KEY not set in .env.gwyneth')
    console.error('Please add your private key to .env.gwyneth file')
    process.exit(1)
  }

  // Setup client
  const account = privateKeyToAccount(DEPLOYER_PRIVATE_KEY as `0x${string}`)
  console.log(`Deployer address: ${account.address}`)

  const walletClient = createWalletClient({
    account,
    chain: gwyneth,
    transport: http(RPC_URL),
  })

  const publicClient = createPublicClient({
    chain: gwyneth,
    transport: http(RPC_URL),
  })

  // Check connection
  try {
    const chainId = await publicClient.getChainId()
    if (chainId !== 160010) {
      console.error(`❌ Wrong chain ID: ${chainId}, expected 160010`)
      process.exit(1)
    }
    console.log(`✅ Connected to Gwyneth (chain ID: ${chainId})`)

    const balance = await publicClient.getBalance({ address: account.address })
    console.log(`Deployer balance: ${Value.formatEther(balance)} ETH`)

    if (balance === 0n) {
      console.error(
        '❌ Deployer account has no ETH. Please fund the account first.',
      )
      process.exit(1)
    }
    console.log()
  } catch (error) {
    console.error('❌ Failed to connect to Gwyneth network at', RPC_URL)
    console.error('Make sure your Gwyneth node is running on port 32002')
    console.error(error)
    process.exit(1)
  }

  const deployedAddresses: Record<string, string> = {}

  // Helper function to deploy contracts
  async function deployContract(args: {
    name: string
    abi: any
    bytecode: `0x${string}`
    constructorArgs?: any[]
  }) {
    console.log(`Deploying ${args.name}...`)

    const hash = await walletClient.deployContract({
      abi: args.abi,
      bytecode: args.bytecode,
      args: args.constructorArgs || [],
      gas: DEPLOYMENT_GAS_LIMIT,
    })

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      timeout: TX_CONFIRM_TIMEOUT_MS,
    })

    if (receipt.status !== 'success') {
      throw new Error(`Deploy ${args.name} reverted (tx: ${hash})`)
    }

    if (!receipt.contractAddress) {
      throw new Error(
        `Deploy ${args.name} missing contractAddress (tx: ${hash})`,
      )
    }

    const deployedCode = await publicClient.getBytecode({
      address: receipt.contractAddress,
    })
    if (!deployedCode || deployedCode === '0x') {
      throw new Error(
        `Deploy ${args.name} produced empty code at ${receipt.contractAddress} (tx: ${hash})`,
      )
    }

    console.log(`   ✅ ${args.name} deployed at: ${receipt.contractAddress}`)
    return receipt.contractAddress
  }

  // 1. Deploy Orchestrator
  deployedAddresses.orchestrator = await deployContract({
    name: 'Orchestrator',
    abi: Orchestrator.abi,
    bytecode: Orchestrator.code as `0x${string}`,
  })

  // 2. Deploy Account Implementation
  deployedAddresses.accountImplementation = await deployContract({
    name: 'IthacaAccount',
    abi: IthacaAccount.abi,
    bytecode: IthacaAccount.code as `0x${string}`,
    constructorArgs: [deployedAddresses.orchestrator],
  })

  // 3. Deploy EIP7702 Proxy
  deployedAddresses.accountProxy = await deployContract({
    name: 'EIP7702Proxy',
    abi: EIP7702Proxy.abi,
    bytecode: EIP7702Proxy.code as `0x${string}`,
    constructorArgs: [deployedAddresses.accountImplementation, account.address],
  })

  // 4. Deploy Simulator
  deployedAddresses.simulator = await deployContract({
    name: 'Simulator',
    abi: Simulator.abi,
    bytecode: Simulator.code as `0x${string}`,
  })

  // 5. Deploy SimpleFunder
  deployedAddresses.funder = await deployContract({
    name: 'SimpleFunder',
    abi: SimpleFunder.abi,
    bytecode: SimpleFunder.code as `0x${string}`,
    constructorArgs: [account.address, account.address],
  })

  // Fund the funder contract
  console.log('Funding the Funder contract...')
  const fundHash = await walletClient.sendTransaction({
    to: deployedAddresses.funder as Address.Address,
    value: Value.fromEther('10'),
    gas: VALUE_TRANSFER_GAS_LIMIT,
  })
  await publicClient.waitForTransactionReceipt({
    hash: fundHash,
    timeout: TX_CONFIRM_TIMEOUT_MS,
  })
  console.log('   ✅ Funder funded with 10 ETH')

  // 6. Deploy Escrow
  deployedAddresses.escrow = await deployContract({
    name: 'Escrow',
    abi: Escrow.abi,
    bytecode: Escrow.code as `0x${string}`,
  })

  // 7. Deploy SimpleSettler
  deployedAddresses.settler = await deployContract({
    name: 'SimpleSettler',
    abi: SimpleSettler.abi,
    bytecode: SimpleSettler.code as `0x${string}`,
    constructorArgs: [account.address],
  })

  // 8. Deploy Demo Tokens (optional)
  const demoTokens: Record<string, string> = {}

  if (DEPLOY_DEMO_TOKENS) {
    console.log('\n📦 Deploying demo tokens...')

    for (const i of [1, 2]) {
      const tokenAddress = await deployContract({
        name: `ExperimentERC20 (EXP${i})`,
        abi: ExperimentERC20.abi,
        bytecode: ExperimentERC20.code as `0x${string}`,
        constructorArgs: ['ExperimentERC20', `EXP${i}`, i === 1 ? 100n : 1n],
      })
      demoTokens[`exp${i}`] = tokenAddress
    }

    // Deploy NFT
    const nftAddress = await deployContract({
      name: 'ExperimentERC721 (GEN)',
      abi: ExperimentERC721.abi,
      bytecode: ExperimentERC721.code as `0x${string}`,
      constructorArgs: [
        'GEN',
        'Ithaca Genesis',
        '',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDE0NCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDQiIGhlaWdodD0iMTQ0IiBmaWxsPSIjMDA5MEZGIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDFfNCkiPgo8cGF0aCBkPSJNOTIuMTEzNiA3Mi41NzM0Qzk0Ljc5NTkgNzEuNzczNCA5Ny43MDE4IDcyLjg1OTEgOTkuMDk4OSA3NS4yMDJMMTE0LjYzNCAxMDEuMjAyQzExNi41OSAxMDQuNDU5IDExNC4xODcgMTA4LjYzIDExMC4yNzUgMTA4LjYzSDMwLjAyODRDMjUuOTQ5IDEwOC42MyAyMy41NDYxIDEwNC4wNTkgMjUuOTQ5IDEwMC44MDJMMzMuMDQ2MSA5MS4wODc0QzMzLjgyODQgODkuOTQ0NiAzNC45NDYxIDg5LjIwMTcgMzYuMjMxNCA4OC44MDJMOTIuMDU3NyA3Mi41NzM0SDkyLjExMzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBvcGFjaXR5PSIwLjc1IiBkPSJNNjMuMjc5NiAzNS44ODI5QzY0LjM5NzIgMzMuODgyOSA2Ny41MjY2IDM0LjM5NzIgNjcuOTczNyAzNi42MjU4TDc0LjU2NzggNzAuMTExNUM3NC43Mzc4IDcwLjk3MzUgNzQuNTc3NCA3MS44NjkyIDc0LjExOTcgNzIuNjEzN0M3My42NjIxIDczLjM1ODIgNzIuOTQyMyA3My44OTQzIDcyLjEwOSA3NC4xMTE1TDQwLjk4MjUgODMuMzY4NkMzOC44MDMxIDg0LjA1NDMgMzYuOTU5IDgxLjc2ODYgMzguMDc2NiA3OS44MjU4TDYzLjI3OTYgMzUuODgyOVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIG9wYWNpdHk9IjAuNSIgZD0iTTcxLjI3MDcgMzMuNzE0NUM3MC45MzU0IDMyLjExNDUgNzMuMTcwNyAzMS4zMTQ1IDc0LjA2NDggMzIuNzQzMUw5My43OTEyIDY2LjA1NzRDOTQuMjk0MSA2Ni45MTQ1IDkzLjc5MTIgNjguMDAwMiA5Mi44OTcxIDY4LjIyODhMODEuNDQxMiA3MS4zNzE3QzgxLjExMDkgNzEuNDY1IDgwLjc2NSA3MS40ODgzIDgwLjQyNTQgNzEuNDQwMUM4MC4wODU4IDcxLjM5MTkgNzkuNzU5NCA3MS4yNzMxIDc5LjQ2NjMgNzEuMDkxMUM3OS4xNzMyIDcwLjkwOTIgNzguOTE5NiA3MC42Njc4IDc4LjcyMSA3MC4zODJDNzguNTIyNSA3MC4wOTYxIDc4LjM4MzMgNjkuNzcxNyA3OC4zMTE4IDY5LjQyODhMNzEuMjcwNyAzMy43NzE2VjMzLjcxNDVaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzQwMV80Ij4KPHJlY3Qgd2lkdGg9Ijk1IiBoZWlnaHQ9IjgwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUgMzIpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==',
        demoTokens.exp1 || '0x0000000000000000000000000000000000000000',
        Value.fromEther('10'),
      ],
    })
    demoTokens.nft = nftAddress
  }

  // 9. Ensure Multicall3 (canonical address) exists
  const multicall3Address = MULTICALL3_ADDRESS
  console.log('Ensuring Multicall3 is deployed at canonical address...')
  const existingMulticallCode = await publicClient.getBytecode({
    address: multicall3Address,
  })

  if (existingMulticallCode && existingMulticallCode !== '0x') {
    console.log(`   ✅ Multicall3 already deployed at: ${multicall3Address}`)
  } else {
    console.log(
      '   ℹ️  Multicall3 not found. Funding canonical deployer and broadcasting signed transaction...',
    )
    const deployerBalance = await publicClient.getBalance({
      address: MULTICALL3_DEPLOYER,
    })

    if (deployerBalance < MULTICALL3_MIN_BALANCE) {
      const desiredBalance = MULTICALL3_TARGET_BALANCE
      const topUpAmount =
        desiredBalance > deployerBalance
          ? desiredBalance - deployerBalance
          : MULTICALL3_MIN_BALANCE - deployerBalance
      console.log(
        `   ↳ Funding deployer ${MULTICALL3_DEPLOYER} with ${Value.formatEther(topUpAmount)} ETH (current balance: ${Value.formatEther(deployerBalance)} ETH)`,
      )

      const fundHash = await walletClient.sendTransaction({
        to: MULTICALL3_DEPLOYER,
        value: topUpAmount,
        gas: VALUE_TRANSFER_GAS_LIMIT,
      })
      await publicClient.waitForTransactionReceipt({ hash: fundHash })
    } else {
      console.log(
        `   ↳ Canonical deployer already funded (${Value.formatEther(deployerBalance)} ETH)`,
      )
    }

    console.log('   ↳ Publishing pre-signed Multicall3 deployment via cast...')
    const castResult = spawnSync(
      'cast',
      ['publish', MULTICALL3_SIGNED_TX, '--rpc-url', RPC_URL],
      {
        stdio: 'inherit',
      },
    )
    if (castResult.error) {
      throw new Error(
        `Failed to run "cast publish": ${castResult.error.message}`,
      )
    }
    if (castResult.status !== 0) {
      throw new Error(`"cast publish" exited with status ${castResult.status}`)
    }

    const deployedMulticallCode = await publicClient.getBytecode({
      address: multicall3Address,
    })
    if (!deployedMulticallCode || deployedMulticallCode === '0x') {
      throw new Error('Failed to deploy Multicall3 at canonical address')
    }

    console.log(
      `   ✅ Multicall3 deployed at standard address: ${multicall3Address}`,
    )
  }

  // Save deployment addresses
  console.log('\n📄 Saving deployment information...')

  // Create directories if they don't exist
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const configDir = resolve(scriptDir, '../config')
  mkdirSync(configDir, { recursive: true })

  const addressesPath = resolve(configDir, 'gwyneth-addresses.json')
  const addressesContent = JSON.stringify(
    {
      chainId: gwyneth.id,
      chainName: gwyneth.name,
      rpcUrl: RPC_URL,
      contracts: {
        orchestrator: deployedAddresses.orchestrator,
        accountImplementation: deployedAddresses.accountImplementation,
        accountProxy: deployedAddresses.accountProxy,
        simulator: deployedAddresses.simulator,
        funder: deployedAddresses.funder,
        escrow: deployedAddresses.escrow,
        settler: deployedAddresses.settler,
        multicall3: multicall3Address,
      },
      demoTokens,
      deployedAt: new Date().toISOString(),
      deployedBy: account.address,
    },
    null,
    2,
  )

  writeFileSync(addressesPath, addressesContent)
  console.log(`   ✅ Addresses saved to: ${addressesPath}`)

  // Generate TypeScript exports
  const chainsDir = resolve(scriptDir, '../src/chains')
  mkdirSync(chainsDir, { recursive: true })

  const exportsPath = resolve(chainsDir, 'gwyneth-contracts.ts')
  const exportsContent = `// Gwyneth Network Contract Addresses
// Generated on ${new Date().toISOString()}
// Chain ID: ${gwyneth.id}

export const gwynethContracts = {
  chainId: ${gwyneth.id},
  orchestrator: '${deployedAddresses.orchestrator}' as const,
  accountImplementation: '${deployedAddresses.accountImplementation}' as const,
  accountProxy: '${deployedAddresses.accountProxy}' as const,
  simulator: '${deployedAddresses.simulator}' as const,
  funder: '${deployedAddresses.funder}' as const,
  escrow: '${deployedAddresses.escrow}' as const,
  settler: '${deployedAddresses.settler}' as const,
  multicall3: '${multicall3Address}' as const,
} as const

export const gwynethDemoTokens = ${JSON.stringify(demoTokens, null, 2)} as const
`

  writeFileSync(exportsPath, exportsContent)
  console.log(`   ✅ TypeScript exports saved to: ${exportsPath}`)

  console.log('\n✨ Deployment complete!')
  console.log('=====================================')
  console.log('\n📋 Contract Addresses:')
  console.log(`   Orchestrator:     ${deployedAddresses.orchestrator}`)
  console.log(`   Account Impl:     ${deployedAddresses.accountImplementation}`)
  console.log(`   Account Proxy:    ${deployedAddresses.accountProxy}`)
  console.log(`   Simulator:        ${deployedAddresses.simulator}`)
  console.log(`   Funder:           ${deployedAddresses.funder}`)
  console.log(`   Escrow:           ${deployedAddresses.escrow}`)
  console.log(`   Settler:          ${deployedAddresses.settler}`)
  console.log(`   Multicall3:       ${multicall3Address}`)

  if (Object.keys(demoTokens).length > 0) {
    console.log('\n📦 Demo Tokens:')
    Object.entries(demoTokens).forEach(([key, address]) => {
      console.log(`   ${key.toUpperCase()}:              ${address}`)
    })
  }

  console.log('\n🎯 Next steps:')
  console.log('1. Configure the relay for Gwyneth (see relay-gwyneth.yaml)')
  console.log('2. Start the relay: pnpm relay:gwyneth')
  console.log('3. Update app config to use Gwyneth chain')
  console.log('4. Start the apps: pnpm dev:gwyneth')
}

main().catch((error) => {
  console.error('\n❌ Deployment failed:', error)
  process.exit(1)
})
