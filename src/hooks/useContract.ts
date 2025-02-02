import {
  Bull,
  BullFlexibleSideVaultV2,
  BullVaultV2,
  Erc20,
  Erc20Bytes32,
  Erc721collection,
  Multicall,
  Weth,
  Zap,
} from 'config/abi/types'
import zapAbi from 'config/abi/zap.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import { useMemo } from 'react'
import { getMulticallAddress, getPredictionsV1Address, getZapAddress } from 'utils/addressHelpers'
import {
  getAnniversaryAchievementContract,
  getBCakeFarmBoosterContract,
  getBCakeFarmBoosterProxyFactoryContract,
  getBCakeProxyContract,
  getBep20Contract,
  getBunnyFactoryContract,
  getBunnySpecialCakeVaultContract,
  getBunnySpecialContract,
  getBunnySpecialLotteryContract,
  getBunnySpecialPredictionContract,
  getBunnySpecialXmasContract,
  getCakeContract,
  getCakeFlexibleSideVaultV2Contract,
  getCakePredictionsContract,
  getCakeVaultV2Contract,
  getChainlinkOracleContract,
  getClaimRefundContract,
  getEasterNftContract,
  getErc721CollectionContract,
  getErc721Contract,
  getFarmAuctionContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getIfoV3Contract,
  getLotteryV2Contract,
  getMasterchefContract,
  getMasterchefV1Contract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeBunniesContract,
  getPancakeSquadContract,
  getPointCenterIfoContract,
  getPotteryDrawContract,
  getPotteryVaultContract,
  getPredictionsContract,
  getPredictionsV1Contract,
  getProfileContract,
  getSouschefContract,
  getTradingCompetitionContractEaster,
  getTradingCompetitionContractFanToken,
  getTradingCompetitionContractMobox,
  getTradingCompetitionContractMoD,
} from 'utils/contractHelpers'
import { useSigner } from 'wagmi'

// Imports below migrated from Exchange useContract.ts
import { Contract } from 'ethers'
import { WNATIVE } from '@pancakeswap/sdk'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import IBullPairABI from '../config/abi/IBullPair.json'
import multiCallAbi from '../config/abi/Multicall.json'
import WETH_ABI from '../config/abi/weth.json'
import { getContract } from '../utils'

import { IBullPair } from '../config/abi/types/IBullPair'
import { VaultKey } from '../state/types'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV1Contract(address, signer), [address, signer])
}

export const useIfoV2Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV2Contract(address, signer), [address, signer])
}

export const useIfoV3Contract = (address: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => getIfoV3Contract(address, signer), [address, signer])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBep20Contract(address, providerOrSigner), [address, providerOrSigner])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getErc721Contract(address, providerOrSigner), [address, providerOrSigner])
}

export const useCake = (): { reader: Bull; signer: Bull } => {
  const providerOrSigner = useProviderOrSigner()
  const { chainId } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getCakeContract(chainId),
      signer: getCakeContract(chainId, providerOrSigner),
    }),
    [providerOrSigner, chainId],
  )
}

export const useBunnyFactory = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnyFactoryContract(signer), [signer])
}

export const usePancakeBunnies = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeBunniesContract(signer), [signer])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getProfileContract(providerOrSigner), [providerOrSigner])
}

export const useLotteryV2Contract = () => {
  const providerOrSigner = useProviderOrSigner()
  return useMemo(() => getLotteryV2Contract(providerOrSigner), [providerOrSigner])
}

export const useMasterchef = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  const { chainId } = useActiveWeb3React()
  return useMemo(
    () => getMasterchefContract(chainId, providerOrSigner),
    [providerOrSigner, chainId]
  )
}

export const useMasterchefV1 = () => {
  const { data: signer } = useSigner()
  const { chainId } = useActiveWeb3React()
  return useMemo(() => getMasterchefV1Contract(chainId, signer), [signer, chainId])
}

export const useSousChef = (id, chainId) => {
  const { data: signer } = useSigner()
  return useMemo(() => getSouschefContract(id, chainId, signer), [id, signer, chainId])
}

export const usePointCenterIfoContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPointCenterIfoContract(signer), [signer])
}

export const useBunnySpecialContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialContract(signer), [signer])
}

export const useClaimRefundContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getClaimRefundContract(signer), [signer])
}

export const useTradingCompetitionContractEaster = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getTradingCompetitionContractEaster(providerOrSigner), [providerOrSigner])
}

export const useTradingCompetitionContractFanToken = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getTradingCompetitionContractFanToken(providerOrSigner), [providerOrSigner])
}

export const useTradingCompetitionContractMobox = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getTradingCompetitionContractMobox(providerOrSigner), [providerOrSigner])
}

export const useTradingCompetitionContractMoD = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getTradingCompetitionContractMoD(providerOrSigner), [providerOrSigner])
}

export const useEasterNftContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getEasterNftContract(signer), [signer])
}

export const useVaultPoolContract = (vaultKey: VaultKey): BullVaultV2 | BullFlexibleSideVaultV2 => {
  const { data: signer } = useSigner()
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    if (vaultKey === VaultKey.CakeVault) {
      return getCakeVaultV2Contract(chainId, signer)
    }
    if (vaultKey === VaultKey.CakeFlexibleSideVault) {
      return getCakeFlexibleSideVaultV2Contract(chainId, signer)
    }
    return null
  }, [signer, vaultKey, chainId])
}

export const useCakeVaultContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => getCakeVaultV2Contract(chainId, providerOrSigner),
    [providerOrSigner, chainId]
  )
}

export const usePredictionsContract = (address: string, tokenSymbol: string) => {
  const { data: signer } = useSigner()
  return useMemo(() => {
    if (address === getPredictionsV1Address()) {
      return getPredictionsV1Contract(signer)
    }
    const getPredContract = tokenSymbol === 'BULL' ? getCakePredictionsContract : getPredictionsContract

    return getPredContract(address, signer)
  }, [address, tokenSymbol, signer])
}

export const useChainlinkOracleContract = (address, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getChainlinkOracleContract(address, providerOrSigner), [providerOrSigner, address])
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialCakeVaultContract(signer), [signer])
}

export const useSpecialBunnyPredictionContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialPredictionContract(signer), [signer])
}

export const useBunnySpecialLotteryContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialLotteryContract(signer), [signer])
}

export const useBunnySpecialXmasContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialXmasContract(signer), [signer])
}

export const useAnniversaryAchievementContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getAnniversaryAchievementContract(signer), [signer])
}

export const useNftSaleContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftSaleContract(signer), [signer])
}

export const usePancakeSquadContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeSquadContract(signer), [signer])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getFarmAuctionContract(providerOrSigner), [providerOrSigner])
}

export const useNftMarketContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftMarketContract(signer), [signer])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { data: signer } = useSigner()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(signer, collectionAddress),
    }),
    [signer, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider

  const canReturnContract = useMemo(() => address && ABI && providerOrSigner, [address, ABI, providerOrSigner])

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWNativeContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WNATIVE[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IBullPair | null {
  return useContract(pairAddress, IBullPairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React()
  return useContract<Multicall>(getMulticallAddress(chainId), multiCallAbi, false)
}

export const usePotterytVaultContract = (address) => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryVaultContract(address, signer), [address, signer])
}

export const usePotterytDrawContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryDrawContract(signer), [signer])
}

export function useZapContract(chainId: number, withSignerIfPossible = true) {
  return useContract<Zap>(getZapAddress(chainId), zapAbi, withSignerIfPossible)
}

export function useBCakeFarmBoosterContract(withSignerIfPossible = true) {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => getBCakeFarmBoosterContract(chainId, providerOrSigner),
    [providerOrSigner, chainId]
  )
}

export function useBCakeFarmBoosterProxyFactoryContract(chainId: number, withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBCakeFarmBoosterProxyFactoryContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export function useBCakeProxyContract(proxyContractAddress: string, withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => proxyContractAddress && getBCakeProxyContract(proxyContractAddress, providerOrSigner),
    [providerOrSigner, proxyContractAddress],
  )
}
