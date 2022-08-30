import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useSousChef } from 'hooks/useContract'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const harvestPool = async (sousChefContract, chainId) => {
  const gasPrice = getGasPrice(chainId)
  return sousChefContract.deposit('0', { ...options, gasPrice })
}

const harvestPoolBnb = async (sousChefContract, chainId) => {
  const gasPrice = getGasPrice(chainId)
  return sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
}

const useHarvestPool = (sousId, isUsingBnb = false, chainId) => {
  const sousChefContract = useSousChef(sousId, chainId)

  const handleHarvest = useCallback(async () => {
    if (isUsingBnb) {
      return harvestPoolBnb(sousChefContract, chainId)
    }

    return harvestPool(sousChefContract, chainId)
  }, [isUsingBnb, sousChefContract, chainId])

  return { onReward: handleHarvest }
}

export default useHarvestPool
