import BigNumber from 'bignumber.js'
import { BOOSTED_FARM_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, chainId, amount) => {
  const gasPrice = getGasPrice(chainId)
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.deposit(pid, value, { ...options, gasPrice })
}

export const unstakeFarm = async (masterChefContract, pid, chainId, amount) => {
  const gasPrice = getGasPrice(chainId)
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.withdraw(pid, value, { ...options, gasPrice })
}

export const harvestFarm = async (masterChefContract, pid, chainId) => {
  const gasPrice = getGasPrice(chainId)
  return masterChefContract.deposit(pid, '0', { ...options, gasPrice })
}
