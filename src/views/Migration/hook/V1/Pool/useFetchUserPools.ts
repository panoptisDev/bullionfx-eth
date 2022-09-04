import { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { SerializedPool } from 'state/types'
import { transformPool } from 'state/pools/helpers'
import { getCakeContract } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { PoolCategory } from 'config/constants/types'
import { ethTokens } from 'config/constants/tokens'
import { serializeTokens } from 'utils/serializeTokens'
import { fetchUserStakeBalances, fetchUserPendingRewards } from './fetchPoolsUser'
import { ChainId } from '../../../../../../packages/swap-sdk/src/constants'

export interface PoolsState {
  data: SerializedPool
  userDataLoaded: boolean
}

const serializedTokens = serializeTokens(ethTokens)

const initialData = {
  data: {
    sousId: 0,
    stakingToken: serializedTokens.bull,
    earningToken: serializedTokens.bull,
    contractAddress: {
      5: '0xCCBF0E1975A9dDD7cB41Af7f2C6F037DBaa04d10',
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.25',
    isFinished: false,
    totalStaked: '0',
  },
  userDataLoaded: false,
}

export const useFetchUserPools = (account) => {
  const { chainId } = useActiveWeb3React()
  const [userPoolsData, setPoolsUserData] = useState<PoolsState>(initialData)

  const cakeContract = getCakeContract(chainId ?? ChainId.BSC)

  const fetchUserPoolsData = useCallback(() => {
    if (account) {
      const fetchPoolsUserDataAsync = async () => {
        try {
          const [stakedBalances, pendingRewards, totalStaking] = await Promise.all([
            fetchUserStakeBalances(account, chainId),
            fetchUserPendingRewards(account, chainId),
            cakeContract.balanceOf(initialData.data.contractAddress[chainId]),
          ])

          const userData = {
            sousId: initialData.data.sousId,
            allowance: '0',
            stakingTokenBalance: '0',
            stakedBalance: stakedBalances,
            pendingReward: pendingRewards,
          }

          setPoolsUserData((old) => ({
            data: {
              ...old.data,
              userData,
              totalStaked: new BigNumber(totalStaking.toString()).toJSON(),
            },
            userDataLoaded: true,
          }))
        } catch (error) {
          console.error('[Pools Action] Error fetching pool user data', error)
        }
      }

      fetchPoolsUserDataAsync()
    }
  }, [account, chainId, cakeContract])

  useFastRefreshEffect(() => {
    fetchUserPoolsData()
  }, [fetchUserPoolsData])

  return {
    data: transformPool(userPoolsData.data),
    userDataLoaded: userPoolsData.userDataLoaded,
    fetchUserPoolsData,
  }
}
