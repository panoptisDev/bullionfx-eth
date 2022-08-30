import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVaultV2.json'
import bullVaultAbi from 'config/abi/cakeVaultV2Bull.json'
import { getCakeVaultAddress, getCakeFlexibleSideVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getCakeContract } from 'utils/contractHelpers'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

export const fetchPublicVaultData = async (chainId, cakeVaultAddress?) => {
  const cakeVaultV2 = getCakeVaultAddress(chainId)
  const cakeContract = getCakeContract(chainId)
  try {
    const calls = ['getPricePerFullShare', 'totalShares', 'totalLockedAmount'].map((method) => ({
      address: cakeVaultAddress || cakeVaultV2,
      name: method,
    }))
    const abi = chainId === ChainId.BSC_TESTNET ? bullVaultAbi : cakeVaultAbi
    const [[[sharePrice], [shares], totalLockedAmount], totalCakeInVault] = await Promise.all([
      multicallv2(abi, calls, {
        requireSuccess: false,
        chainId
      }),
      cakeContract.balanceOf(cakeVaultV2),
    ])

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const totalLockedAmountAsBigNumber = totalLockedAmount ? new BigNumber(totalLockedAmount[0].toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: new BigNumber(totalCakeInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalCakeInVault: null,
    }
  }
}

export const fetchPublicFlexibleSideVaultData = async (chainId, cakeVaultAddress?) => {
  const cakeContract = getCakeContract(chainId)
  const cakeFlexibleSideVaultV2 = getCakeFlexibleSideVaultAddress()
  try {
    const calls = ['getPricePerFullShare', 'totalShares'].map((method) => ({
      address: cakeVaultAddress || cakeFlexibleSideVaultV2,
      name: method,
    }))

    const [[[sharePrice], [shares]], totalCakeInVault] = await Promise.all([
      multicallv2(cakeVaultAbi, calls, {
        requireSuccess: false,
      }),
      cakeContract.balanceOf(cakeVaultAddress || cakeFlexibleSideVaultV2),
    ])

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: new BigNumber(totalCakeInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCakeInVault: null,
    }
  }
}

export const fetchVaultFees = async (chainId, cakeVaultAddress?) => {
  const cakeVaultV2 = getCakeVaultAddress(chainId)
  try {
    const calls = ['performanceFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: cakeVaultAddress || cakeVaultV2,
      name: method,
    }))

    const [[performanceFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(cakeVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
