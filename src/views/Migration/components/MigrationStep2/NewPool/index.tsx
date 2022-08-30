import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useCakeVault, usePoolsWithVault } from 'state/pools/hooks'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { useAppDispatch } from 'state'
import {
  fetchCakePoolUserDataAsync,
  fetchCakeVaultFees,
  fetchCakeVaultPublicData,
  fetchCakeVaultUserData,
  fetchCakePoolPublicDataAsync,
  fetchCakeFlexibleSideVaultPublicData,
  fetchCakeFlexibleSideVaultUserData,
  fetchCakeFlexibleSideVaultFees,
} from 'state/pools'
import { batch } from 'react-redux'
import PoolsTable from './PoolTable'

const NewPool: React.FC<React.PropsWithChildren> = () => {
  const { chainId, account } = useWeb3React()
  const { pools } = usePoolsWithVault()
  const cakeVault = useCakeVault()

  const stakedOnlyOpenPools = useMemo(
    () => pools.filter((pool) => pool.userData && pool.sousId === 0 && !pool.isFinished),
    [pools],
  )

  const userDataReady: boolean = !account || (!!account && !cakeVault.userData?.isLoading)

  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchCakeVaultPublicData({ chainId }))
      dispatch(fetchCakeFlexibleSideVaultPublicData({ chainId }))
      dispatch(fetchCakePoolPublicDataAsync())
      if (account) {
        dispatch(fetchCakeVaultUserData({ account, chainId }))
        dispatch(fetchCakeFlexibleSideVaultUserData({ account }))
        dispatch(fetchCakePoolUserDataAsync(account))
      }
    })
  }, [account, dispatch, chainId])

  useEffect(() => {
    batch(() => {
      dispatch(fetchCakeVaultFees({ chainId }))
      dispatch(fetchCakeFlexibleSideVaultFees())
    })
  }, [dispatch, chainId])

  return <PoolsTable pools={stakedOnlyOpenPools} account={account} userDataReady={userDataReady} />
}

export default NewPool
