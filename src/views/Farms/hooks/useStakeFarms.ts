import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useStakeFarms = (pid: number, chainId) => {
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      return stakeFarm(masterChefContract, pid, chainId, amount)
    },
    [masterChefContract, pid, chainId],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
