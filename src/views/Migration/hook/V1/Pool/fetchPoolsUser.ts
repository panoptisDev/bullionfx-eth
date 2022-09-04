import BigNumber from 'bignumber.js'
import { getMasterchefV1Contract } from 'utils/contractHelpers'

export const fetchUserStakeBalances = async (account, chainId) => {
  // Cake / Cake pool
  const { amount: masterPoolAmount } = await getMasterchefV1Contract(chainId).userInfo('0', account)
  return new BigNumber(masterPoolAmount.toString()).toJSON()
}

export const fetchUserPendingRewards = async (account, chainId) => {
  // Cake / Cake pool
  const pendingReward = await getMasterchefV1Contract(chainId).pendingBull('0', account)
  return new BigNumber(pendingReward.toString()).toJSON()
}
