import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { farmsConfig, farmsTestnetConfig, SLOW_INTERVAL } from 'config/constants'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { ChainId } from '@pancakeswap/sdk'
import useSWRImmutable from 'swr/immutable'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getFarmApr } from 'utils/apr'
import { useAppDispatch } from 'state'
import { useRouter } from 'next/router'
import { FarmWithStakedValue } from 'views/Farms/components/types'
import { useBCakeProxyContractAddress } from 'views/Farms/hooks/useBCakeProxyContractAddress'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from '.'
import { DeserializedFarm, DeserializedFarmsState, DeserializedFarmUserData, State } from '../types'
import {
  farmSelector,
  farmFromLpSymbolSelector,
  priceBullFromPidSelector,
  priceGoldFromPidSelector,
  makeBusdPriceFromPidSelector,
  makeUserFarmFromPidSelector,
  makeLpTokenPriceFromLpSymbolSelector,
  makeFarmFromPidSelector,
} from './selectors'

export const usePollFarmsWithUserData = () => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  const { proxyAddress } = useBCakeProxyContractAddress(account)

  useSWRImmutable(
    chainId === ChainId.BSC_TESTNET ? ['publicFarmTestnetData'] : ['publicFarmData'],
    () => {
      const pids = chainId === ChainId.BSC_TESTNET ?
        farmsTestnetConfig.map((farmToFetch) => farmToFetch.pid) :
        farmsConfig.map((farmToFetch) => farmToFetch.pid)
      dispatch(fetchFarmsPublicDataAsync({ pids, chainId }))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )

  const name = proxyAddress ? ['farmsWithUserData', account, proxyAddress] : ['farmsWithUserData', account]

  useSWRImmutable(
    account ? name : null,
    () => {
      const pids = chainId === ChainId.BSC_TESTNET ?
        farmsTestnetConfig.map((farmToFetch) => farmToFetch.pid) :
        farmsConfig.map((farmToFetch) => farmToFetch.pid)
      const params = proxyAddress ? { account, pids, chainId, proxyAddress } : { account, pids, chainId }

      dispatch(fetchFarmUserDataAsync(params))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}

/**
 * Fetches the "core" farm data used globally
 * 2 = BULL-BNB LP
 * 3 = BUSD-BNB LP
 */
const coreFarmPIDs = {
  1: [],
  5: [1, 2],
}

export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  // TODO: multi
  const { chainId } = useActiveWeb3React()

  useFastRefreshEffect(() => {
    dispatch(fetchFarmsPublicDataAsync({ pids: coreFarmPIDs[chainId], chainId }))
  }, [dispatch, chainId])
}

export const useFarms = (): DeserializedFarmsState => {
  return useSelector(farmSelector)
}

export const useFarmsPoolLength = (): number => {
  return useSelector((state: State) => state.farms.poolLength)
}

export const useFarmFromPid = (pid: number): DeserializedFarm => {
  const farmFromPid = useMemo(() => makeFarmFromPidSelector(pid), [pid])
  return useSelector(farmFromPid)
}

export const useFarmFromLpSymbol = (lpSymbol: string): DeserializedFarm => {
  const farmFromLpSymbol = useMemo(() => farmFromLpSymbolSelector(lpSymbol), [lpSymbol])
  return useSelector(farmFromLpSymbol)
}

export const useFarmUser = (pid): DeserializedFarmUserData => {
  const farmFromPidUser = useMemo(() => makeUserFarmFromPidSelector(pid), [pid])
  return useSelector(farmFromPidUser)
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const busdPriceFromPid = useMemo(() => makeBusdPriceFromPidSelector(pid), [pid])
  return useSelector(busdPriceFromPid)
}

export const useLpTokenPrice = (symbol: string) => {
  const lpTokenPriceFromLpSymbol = useMemo(() => makeLpTokenPriceFromLpSymbolSelector(symbol), [symbol])
  return useSelector(lpTokenPriceFromLpSymbol)
}

/**
 * @@deprecated use the BUSD hook in /hooks
 */
export const usePriceBullUsdc = (): BigNumber => {
  return useSelector(priceBullFromPidSelector)
}

export const usePriceGoldUsdc = (): BigNumber => {
  return useSelector(priceGoldFromPidSelector)
}

export const useFarmWithStakeValue = (farm: DeserializedFarm): FarmWithStakedValue => {
  const { pathname } = useRouter()
  const bullPrice = usePriceBullUsdc()
  const { regularCakePerBlock } = useFarms()

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceUsdc) {
    return farm
  }
  const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceUsdc)
  const { cakeRewardsApr, lpRewardsApr } = isActive
    ? getFarmApr(
      new BigNumber(farm.poolWeight),
      bullPrice,
      totalLiquidity,
      farm.lpAddresses[ChainId.BSC],
      regularCakePerBlock,
    )
    : { cakeRewardsApr: 0, lpRewardsApr: 0 }

  return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
}
