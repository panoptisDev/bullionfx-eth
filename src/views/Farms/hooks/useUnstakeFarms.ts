import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'

const useUnstakeFarms = (pid: number, chainId) => {
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      return unstakeFarm(masterChefContract, pid, chainId, amount)
    },
    [masterChefContract, pid, chainId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
