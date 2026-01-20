import type { PublicClient } from 'viem'
import {
  type Abi,
  type Address,
  decodeFunctionResult,
  encodeFunctionData,
  type Hex,
} from 'viem'
import { UNISWAP_V2, uniswapMulticallAbi } from './contracts'

type ReadContractCall = {
  abi: Abi
  address: Address
  functionName: string
  args?: readonly unknown[]
}

export async function readContractsViaUniswapMulticall(
  client: PublicClient,
  calls: readonly ReadContractCall[],
): Promise<unknown[]> {
  const encodedCalls = calls.map((call) => ({
    callData: encodeFunctionData({
      abi: call.abi,
      args: (call.args ?? []) as any,
      functionName: call.functionName,
    }),
    target: call.address,
  }))

  const multicallData = encodeFunctionData({
    abi: uniswapMulticallAbi,
    args: [encodedCalls],
    functionName: 'aggregate',
  })
  const multicallRes = await client.call({
    data: multicallData,
    to: UNISWAP_V2.multicall,
  })
  if (!multicallRes.data) throw new Error('Multicall returned empty data')
  const decoded = decodeFunctionResult({
    abi: uniswapMulticallAbi,
    data: multicallRes.data,
    functionName: 'aggregate',
  }) as readonly [bigint, readonly Hex[]]
  const returnData = decoded[1]

  const results = returnData.map((data, index) => {
    const call = calls[index]!
    return decodeFunctionResult({
      abi: call.abi,
      data,
      functionName: call.functionName,
    })
  })

  return results
}
