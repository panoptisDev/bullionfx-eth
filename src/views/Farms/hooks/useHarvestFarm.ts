import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number, chainId) => {
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    return harvestFarm(masterChefContract, farmPid, chainId)
  }, [farmPid, masterChefContract, chainId])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
