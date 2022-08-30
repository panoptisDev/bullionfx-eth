import type {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction,
  // eslint-disable-next-line import/no-unresolved
} from '@reduxjs/toolkit/dist/matchers'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import stringify from 'fast-json-stable-stringify'
import farmsConfig, { farmsTestnet } from 'config/constants/farms'
import multicall from 'utils/multicall'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefTestnetABI from 'config/abi/masterchefTestnet.json'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { getBalanceAmount } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import type { AppState } from 'state'
import splitProxyFarms from 'views/Farms/components/YieldBooster/helpers/splitProxyFarms'
import { farmsTestnetConfig } from 'config/constants'

import fetchFarms from './fetchFarms'
import getFarmsPrices from './getFarmsPrices'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { SerializedFarmsState, SerializedFarm } from '../types'
import { fetchMasterChefFarmPoolLength } from './fetchMasterChefData'
import { resetUserState } from '../global/actions'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

const initialState: SerializedFarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
  chainId: ChainId.BSC,
  loadingKeys: {},
}

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<
  [SerializedFarm[], number, number, number],
  { pids: number[], chainId: number },
  {
    state: AppState
  }
>(
  'farms/fetchFarmsPublicDataAsync',
  async ({ pids, chainId }) => {
    const masterChefAddress = getMasterChefAddress(chainId)
    const calls = chainId === ChainId.BSC_TESTNET ? [
      {
        address: masterChefAddress,
        name: 'poolLength',
      },
      {
        address: masterChefAddress,
        name: 'bullPerBlock',
        params: [true],
      },
    ] : [
      {
        address: masterChefAddress,
        name: 'poolLength',
      },
      {
        address: masterChefAddress,
        name: 'cakePerBlock',
        params: [true],
      },
    ]
    const [[poolLength], [cakePerBlockRaw]] = await multicall(chainId === ChainId.BSC_TESTNET ? masterchefTestnetABI : masterchefABI, calls, chainId)
    const regularCakePerBlock = getBalanceAmount(ethersToBigNumber(cakePerBlockRaw))
    const farmsCanFetch = chainId === ChainId.BSC_TESTNET ? farmsTestnet.filter(
      (farmConfig) => pids.includes(farmConfig.pid) && poolLength.gt(farmConfig.pid),
    ) : farmsConfig.filter(
      (farmConfig) => pids.includes(farmConfig.pid) && poolLength.gt(farmConfig.pid),
    )
    const farms = await fetchFarms(farmsCanFetch, chainId)
    const farmsWithPrices = getFarmsPrices(farms, chainId)
    return [farmsWithPrices, poolLength.toNumber(), regularCakePerBlock.toNumber(), chainId]
  },
  {
    condition: (arg, { getState }) => {
      const { farms } = getState()
      if (arg.chainId === ChainId.BSC_TESTNET && arg.chainId !== farms.chainId) return true
      if (farms.loadingKeys[stringify({ type: fetchFarmsPublicDataAsync.typePrefix, arg })]) {
        console.debug('farms action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

interface FarmUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
  proxy?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
  }
}

async function getBoostedFarmsStakeValue(farms, account, chainId, proxyAddress) {
  const [
    userFarmAllowances,
    userFarmTokenBalances,
    userStakedBalances,
    userFarmEarnings,
    proxyUserFarmAllowances,
    proxyUserStakedBalances,
    proxyUserFarmEarnings,
  ] = await Promise.all([
    fetchFarmUserAllowances(account, farms, chainId),
    fetchFarmUserTokenBalances(account, farms, chainId),
    fetchFarmUserStakedBalances(account, farms, chainId),
    fetchFarmUserEarnings(account, farms, chainId),
    // Proxy call
    fetchFarmUserAllowances(account, farms, chainId, proxyAddress),
    fetchFarmUserStakedBalances(proxyAddress, farms, chainId),
    fetchFarmUserEarnings(proxyAddress, farms, chainId),
  ])

  const farmAllowances = userFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: farms[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
      proxy: {
        allowance: proxyUserFarmAllowances[index],
        // NOTE: Duplicate tokenBalance to maintain data structure consistence
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: proxyUserStakedBalances[index],
        earnings: proxyUserFarmEarnings[index],
      },
    }
  })

  return farmAllowances
}

async function getNormalFarmsStakeValue(farms, account, chainId) {
  const [userFarmAllowances, userFarmTokenBalances, userStakedBalances, userFarmEarnings] = await Promise.all([
    fetchFarmUserAllowances(account, farms, chainId),
    fetchFarmUserTokenBalances(account, farms, chainId),
    fetchFarmUserStakedBalances(account, farms, chainId),
    fetchFarmUserEarnings(account, farms, chainId),
  ])
  const normalFarmAllowances = userFarmAllowances.map((_, index) => {
    return {
      pid: farms[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })
  return normalFarmAllowances
}

export const fetchFarmUserDataAsync = createAsyncThunk<
  FarmUserDataResponse[],
  { account: string; pids: number[]; chainId: number; proxyAddress?: string },
  {
    state: AppState
  }
>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids, chainId, proxyAddress }, config) => {
    const poolLength = config.getState().farms.poolLength ?? (await fetchMasterChefFarmPoolLength(chainId)).toNumber()
    const farmsCanFetch = chainId === ChainId.BSC_TESTNET ? farmsTestnetConfig.filter(
      (farmConfig) => pids.includes(farmConfig.pid) && poolLength > farmConfig.pid,
    ) : farmsConfig.filter(
      (farmConfig) => pids.includes(farmConfig.pid) && poolLength > farmConfig.pid,
    )
    if (proxyAddress && farmsCanFetch?.length) {
      const { normalFarms, farmsWithProxy } = splitProxyFarms(farmsCanFetch)

      const [proxyAllowances, normalAllowances] = await Promise.all([
        getBoostedFarmsStakeValue(farmsWithProxy, account, proxyAddress, chainId),
        getNormalFarmsStakeValue(normalFarms, account, chainId),
      ])
      return [...proxyAllowances, ...normalAllowances]
    }
    return getNormalFarmsStakeValue(farmsCanFetch, account, chainId)
  },
  {
    condition: (arg, { getState }) => {
      const { farms } = getState()
      if (arg.chainId === ChainId.BSC_TESTNET && arg.chainId !== farms.chainId) return true
      if (farms.loadingKeys[stringify({ type: fetchFarmUserDataAsync.typePrefix, arg })]) {
        console.debug('farms user action is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

type UnknownAsyncThunkFulfilledOrPendingAction =
  | UnknownAsyncThunkFulfilledAction
  | UnknownAsyncThunkPendingAction
  | UnknownAsyncThunkRejectedAction

const serializeLoadingKey = (
  action: UnknownAsyncThunkFulfilledOrPendingAction,
  suffix: UnknownAsyncThunkFulfilledOrPendingAction['meta']['requestStatus'],
) => {
  const type = action.type.split(`/${suffix}`)[0]
  return stringify({
    arg: action.meta.arg,
    type,
  })
}

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.data = state.data.map((farm) => {
        return {
          ...farm,
          userData: {
            allowance: '0',
            tokenBalance: '0',
            stakedBalance: '0',
            earnings: '0',
          },
        }
      })
      state.userDataLoaded = false
    })
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      const [farmPayload, poolLength, regularCakePerBlock, chainId] = action.payload
      if (chainId === ChainId.BSC_TESTNET && chainId !== state.chainId) {
        state.data = farmPayload
      }
      else {
        state.data = state.data.map((farm) => {
          const liveFarmData = farmPayload.find((farmData) => farmData.pid === farm.pid)
          return { ...farm, ...liveFarmData }
        })
      }
      state.poolLength = poolLength
      state.regularCakePerBlock = regularCakePerBlock
      state.chainId = chainId ?? state.chainId
    })

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl

        const index = state.data.findIndex((farm) => farm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })

    builder.addMatcher(isAnyOf(fetchFarmUserDataAsync.pending, fetchFarmsPublicDataAsync.pending), (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
    })
    builder.addMatcher(
      isAnyOf(fetchFarmUserDataAsync.fulfilled, fetchFarmsPublicDataAsync.fulfilled),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
      },
    )
    builder.addMatcher(
      isAnyOf(fetchFarmsPublicDataAsync.rejected, fetchFarmUserDataAsync.rejected),
      (state, action) => {
        state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
      },
    )
  },
})

export default farmsSlice.reducer
