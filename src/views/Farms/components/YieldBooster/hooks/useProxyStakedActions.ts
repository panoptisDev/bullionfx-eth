import { useWeb3React } from '@pancakeswap/wagmi'
import { useBCakeProxyContract } from 'hooks/useContract'

import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { harvestFarm, stakeFarm, unstakeFarm } from 'utils/calls/farms'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useBCakeProxyContractAddress } from 'views/Farms/hooks/useBCakeProxyContractAddress'
import { useApproveBoostProxyFarm } from '../../../hooks/useApproveFarm'
import useProxyCAKEBalance from './useProxyCAKEBalance'

export default function useProxyStakedActions(pid, lpContract) {
  const { chainId, account } = useWeb3React()
  const { proxyAddress } = useBCakeProxyContractAddress(account)
  const bCakeProxy = useBCakeProxyContract(proxyAddress)
  const dispatch = useAppDispatch()
  const { proxyCakeBalance, refreshProxyCakeBalance } = useProxyCAKEBalance()

  const onDone = useCallback(() => {
    refreshProxyCakeBalance()
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid], chainId, proxyAddress }))
  }, [account, proxyAddress, pid, dispatch, refreshProxyCakeBalance, chainId])

  const { onApprove } = useApproveBoostProxyFarm(lpContract, proxyAddress)

  const onStake = useCallback(
    (value) => stakeFarm(bCakeProxy, pid, chainId, value),
    [bCakeProxy, pid, chainId]
  )

  const onUnstake = useCallback(
    (value) => unstakeFarm(bCakeProxy, pid, chainId, value),
    [bCakeProxy, pid, chainId]
  )

  const onReward = useCallback(
    () => harvestFarm(bCakeProxy, pid, chainId),
    [bCakeProxy, pid, chainId]
  )

  return {
    onStake,
    onUnstake,
    onReward,
    onApprove,
    onDone,
    proxyCakeBalance,
  }
}
