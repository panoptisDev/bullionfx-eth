import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const sousUnstake = (sousChefContract: any, amount: string, decimals: number, chainId: number) => {
  const gasPrice = getGasPrice(chainId)
  const units = parseUnits(amount, decimals)

  return sousChefContract.withdraw(units.toString(), {
    gasPrice,
  })
}

const sousEmergencyUnstake = (sousChefContract: any, chainId: number) => {
  const gasPrice = getGasPrice(chainId)
  return sousChefContract.emergencyWithdraw({ gasPrice })
}

const useUnstakePool = (sousId: number, enableEmergencyWithdraw = false, chainId) => {
  const sousChefContract = useSousChef(sousId, chainId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (enableEmergencyWithdraw) {
        return sousEmergencyUnstake(sousChefContract, chainId)
      }

      return sousUnstake(sousChefContract, amount, decimals, chainId)
    },
    [enableEmergencyWithdraw, sousChefContract, chainId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
