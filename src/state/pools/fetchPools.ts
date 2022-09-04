import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import poolsConfig, { poolsTestnet } from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import chunk from 'lodash/chunk'
import sousChefV2 from '../../config/abi/sousChefV2.json'
import sousChefV3 from '../../config/abi/sousChefV3.json'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

export const fetchPoolsBlockLimits = async (chainId: number) => {
  const poolsWithEnd = chainId === ChainId.BSC_TESTNET ?
    poolsTestnet.filter((p) => p.sousId !== 0) :
    poolsConfig.filter((p) => p.sousId !== 0)

  const startEndBlockCalls = poolsWithEnd.flatMap((poolConfig) => {
    return [
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'startBlock',
      },
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'bonusEndBlock',
      },
    ]
  })

  const startEndBlockRaw = await multicall(
    sousChefABI,
    startEndBlockCalls,
    chainId
  )

  const startEndBlockResult = startEndBlockRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2)

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const [[startBlock], [endBlock]] = startEndBlockResult[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: startBlock.toNumber(),
      endBlock: endBlock.toNumber(),
    }
  })
}

export const fetchPoolsTotalStaking = async (chainId: number) => {
  const pools = chainId === ChainId.BSC_TESTNET ? poolsTestnet : poolsConfig
  const poolsBalanceOf = pools.map((poolConfig) => {
    return {
      address: poolConfig.stakingToken.address,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress, chainId)],
    }
  })

  const poolsTotalStaked = await multicall(erc20ABI, poolsBalanceOf, chainId)

  return pools.map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
  }))
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
  chainId: number
): Promise<{ [key: string]: { stakingLimit: BigNumber; numberBlocksForUserLimit: number } }> => {
  const pools = chainId === ChainId.BSC_TESTNET ? poolsTestnet : poolsConfig
  const validPools = pools
    .filter((p) => p.stakingToken.symbol !== 'BNB' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  const poolStakingCalls = validPools
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['hasUserLimit', 'poolLimitPerUser', 'numberBlocksForUserLimit'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  const poolStakingResultRaw = await multicallv2(sousChefV2, poolStakingCalls, { requireSuccess: false, chainId })
  const chunkSize = poolStakingCalls.length / validPools.length
  const poolStakingChunkedResultRaw = chunk(poolStakingResultRaw.flat(), chunkSize)
  return poolStakingChunkedResultRaw.reduce((accum, stakingLimitRaw, index) => {
    const hasUserLimit = stakingLimitRaw[0]
    const stakingLimit = hasUserLimit && stakingLimitRaw[1] ? new BigNumber(stakingLimitRaw[1].toString()) : BIG_ZERO
    const numberBlocksForUserLimit = stakingLimitRaw[2] ? (stakingLimitRaw[2] as EthersBigNumber).toNumber() : 0
    return {
      ...accum,
      [validPools[index].sousId]: { stakingLimit, numberBlocksForUserLimit },
    }
  }, {})
}

export const fetchPoolsProfileRequirement = async (chainId: number): Promise<{
  [key: string]: {
    required: boolean
    thresholdPoints: BigNumber
  }
}> => {
  const pools = chainId === ChainId.BSC_TESTNET ? poolsTestnet : poolsConfig
  const poolsWithV3 = pools.filter((pool) => pool?.version === 3)

  const poolProfileRequireCalls = poolsWithV3
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['pancakeProfileIsRequested', 'pancakeProfileThresholdPoints'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  const poolProfileRequireResultRaw = await multicallv2(sousChefV3, poolProfileRequireCalls, { requireSuccess: false, chainId })
  const chunkSize = poolProfileRequireCalls.length / poolsWithV3.length
  const poolStakingChunkedResultRaw = chunk(poolProfileRequireResultRaw.flat(), chunkSize)
  return poolStakingChunkedResultRaw.reduce((accum, poolProfileRequireRaw, index) => {
    const hasProfileRequired = poolProfileRequireRaw[0]
    const profileThresholdPoints = poolProfileRequireRaw[1]
      ? new BigNumber(poolProfileRequireRaw[1].toString())
      : BIG_ZERO
    return {
      ...accum,
      [poolsWithV3[index].sousId]: {
        required: hasProfileRequired,
        thresholdPoints: profileThresholdPoints.toJSON(),
      },
    }
  }, {})
}
