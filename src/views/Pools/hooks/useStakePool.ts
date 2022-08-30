import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, BOOSTED_FARM_GAS_LIMIT } from 'config'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18, chainId) => {
  const gasPrice = getGasPrice(chainId)
  return sousChefContract.deposit(new BigNumber(amount).times(getFullDecimalMultiplier(decimals)).toString(), {
    ...options,
    gasPrice,
  })
}

const sousStakeBnb = async (sousChefContract, amount, chainId) => {
  const gasPrice = getGasPrice(chainId)
  return sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), {
    ...options,
    gasPrice,
  })
}

const useStakePool = (sousId: number, isUsingBnb = false, chainId) => {
  const sousChefContract = useSousChef(sousId, chainId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingBnb) {
        return sousStakeBnb(sousChefContract, amount, chainId)
      }
      return sousStake(sousChefContract, amount, decimals, chainId)
    },
    [isUsingBnb, sousChefContract, chainId],
  )

  return { onStake: handleStake }
}

export default useStakePool
