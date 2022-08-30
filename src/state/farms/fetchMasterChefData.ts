import masterchefABI from 'config/abi/masterchef.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { SerializedFarmConfig } from '../../config/constants/types'
import { SerializedFarm } from '../types'
import { getMasterChefAddress } from '../../utils/addressHelpers'
import { getMasterchefContract } from '../../utils/contractHelpers'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

export const fetchMasterChefFarmPoolLength = async (chainId?: number) => {
  const masterChefContract = getMasterchefContract(chainId ?? ChainId.BSC)
  const poolLength = await masterChefContract.poolLength()
  return poolLength
}

const masterChefFarmCalls = (farm: SerializedFarm, chainId?: number) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const { pid } = farm
  return pid || pid === 0
    ? [
      {
        address: masterChefAddress,
        name: 'poolInfo',
        params: [pid],
      },
      {
        address: masterChefAddress,
        name: 'totalRegularAllocPoint',
      },
    ]
    : [null, null]
}

export const fetchMasterChefData = async (farms: SerializedFarmConfig[], chainId): Promise<any[]> => {
  const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, chainId))
  const chunkSize = masterChefCalls.flat().length / farms.length
  const masterChefAggregatedCalls = masterChefCalls
    .filter((masterChefCall) => masterChefCall[0] !== null && masterChefCall[1] !== null)
    .flat()
  const masterChefMultiCallResult = await multicallv2(masterchefABI, masterChefAggregatedCalls, { chainId })
  const masterChefChunkedResultRaw = chunk(masterChefMultiCallResult, chunkSize)
  let masterChefChunkedResultCounter = 0
  return masterChefCalls.map((masterChefCall) => {
    if (masterChefCall[0] === null && masterChefCall[1] === null) {
      return [null, null]
    }
    const data = masterChefChunkedResultRaw[masterChefChunkedResultCounter]
    masterChefChunkedResultCounter++
    return data
  })
}
