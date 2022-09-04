import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { ethRpcProvider, goerliRpcProvider } from 'utils/providers'
import poolsConfig, { poolsTestnet } from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import { BULL } from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeBunniesAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getMasterChefV1Address,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddressEaster,
  getEasterNftAddress,
  getCakeVaultAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressFanToken,
  getTradingCompetitionAddressMobox,
  getTradingCompetitionAddressMoD,
  getBunnySpecialXmasAddress,
  getICakeAddress,
  getPotteryDrawAddress,
  getZapAddress,
  getCakeFlexibleSideVaultAddress,
  getPredictionsV1Address,
  getBCakeFarmBoosterAddress,
  getBCakeFarmBoosterProxyFactoryAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeBunniesAbi from 'config/abi/pancakeBunnies.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import bullAbi from 'config/abi/bull.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import masterChefV1 from 'config/abi/masterchefV1.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionEasterAbi from 'config/abi/tradingCompetitionEaster.json'
import tradingCompetitionFanTokenAbi from 'config/abi/tradingCompetitionFanToken.json'
import tradingCompetitionMoboxAbi from 'config/abi/tradingCompetitionMobox.json'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import easterNftAbi from 'config/abi/easterNft.json'
import bullVaultV2Abi from 'config/abi/bullVaultV2.json'
import bullFlexibleSideVaultV2Abi from 'config/abi/bullFlexibleSideVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import predictionsV1Abi from 'config/abi/predictionsV1.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import potteryVaultAbi from 'config/abi/potteryVaultAbi.json'
import potteryDrawAbi from 'config/abi/potteryDrawAbi.json'
import zapAbi from 'config/abi/zap.json'
import iBullAbi from 'config/abi/IBull.json'
import ifoV3Abi from 'config/abi/ifoV3.json'
import cakePredictionsAbi from 'config/abi/cakePredictions.json'
import bBullFarmBoosterAbi from 'config/abi/bBullFarmBooster.json'
import bBullFarmBoosterProxyFactoryAbi from 'config/abi/bBullFarmBoosterProxyFactory.json'
import bBullProxyAbi from 'config/abi/bBullProxy.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  IfoV1,
  IfoV2,
  Erc20,
  Erc721,
  Bull,
  BunnyFactory,
  PancakeBunnies,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  MasterchefV1,
  SousChef,
  SousChefV2,
  BunnySpecial,
  LpToken,
  ClaimRefund,
  TradingCompetitionEaster,
  TradingCompetitionFanToken,
  EasterNft,
  Multicall,
  BunnySpecialCakeVault,
  BunnySpecialPrediction,
  BunnySpecialLottery,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
  BullVaultV2,
  BullFlexibleSideVaultV2,
  TradingCompetitionMobox,
  IBull,
  TradingCompetitionMoD,
  PotteryVaultAbi,
  PotteryDrawAbi,
  Zap,
  PredictionsV1,
  BBullFarmBooster,
  BBullFarmBoosterProxyFactory,
  BBullProxy,
} from 'config/abi/types'
import { ChainId } from '@pancakeswap/sdk'

export const getContract = (abi: any, address: string, chainId: number, signer?: Signer | Provider) => {
  const provider = chainId === ChainId.BSC_TESTNET ? goerliRpcProvider : ethRpcProvider
  const signerOrProvider = signer ?? provider
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bep20Abi, address, chainId, signer) as Erc20
}
export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(erc721Abi, address, chainId, signer) as Erc721
}
export const getLpContract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(lpTokenAbi, address, chainId, signer) as LpToken
}
export const getIfoV1Contract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(ifoV1Abi, address, chainId, signer) as IfoV1
}
export const getIfoV2Contract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(ifoV2Abi, address, chainId, signer) as IfoV2
}
export const getIfoV3Contract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(ifoV3Abi, address, chainId, signer)
}
export const getSouschefContract = (id: number, chainId: number, signer?: Signer | Provider) => {
  const config = chainId === ChainId.BSC_TESTNET ?
    poolsTestnet.find((pool) => pool.sousId === id) :
    poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress, chainId), chainId, signer) as SousChef
}
export const getSouschefV2Contract = (id: number, signer?: Signer | Provider) => {
  const chainId = 5
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), chainId, signer) as SousChefV2
}

export const getPointCenterIfoContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), chainId, signer) as PointCenterIfo
}
export const getCakeContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bullAbi, chainId ? BULL[chainId].address : BULL[ChainId.BSC].address, chainId, signer) as Bull
}
export const getProfileContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(profileABI, getPancakeProfileAddress(), chainId, signer) as PancakeProfile
}
export const getPancakeBunniesContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(pancakeBunniesAbi, getPancakeBunniesAddress(), chainId, signer) as PancakeBunnies
}
export const getBunnyFactoryContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), chainId, signer) as BunnyFactory
}
export const getBunnySpecialContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), chainId, signer) as BunnySpecial
}
export const getLotteryV2Contract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(lotteryV2Abi, getLotteryV2Address(), chainId, signer) as LotteryV2
}
export const getMasterchefContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(masterChef, getMasterChefAddress(chainId), chainId, signer) as Masterchef
}
export const getMasterchefV1Contract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(masterChefV1, getMasterChefV1Address(chainId), chainId, signer) as MasterchefV1
}
export const getClaimRefundContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(claimRefundAbi, getClaimRefundAddress(), chainId, signer) as ClaimRefund
}
export const getTradingCompetitionContractEaster = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(
    tradingCompetitionEasterAbi,
    getTradingCompetitionAddressEaster(),
    chainId,
    signer,
  ) as TradingCompetitionEaster
}

export const getTradingCompetitionContractFanToken = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(
    tradingCompetitionFanTokenAbi,
    getTradingCompetitionAddressFanToken(),
    chainId,
    signer,
  ) as TradingCompetitionFanToken
}
export const getTradingCompetitionContractMobox = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(tradingCompetitionMoboxAbi, getTradingCompetitionAddressMobox(), chainId, signer) as TradingCompetitionMobox
}

export const getTradingCompetitionContractMoD = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(tradingCompetitionMoDAbi, getTradingCompetitionAddressMoD(), chainId, signer) as TradingCompetitionMoD
}

export const getEasterNftContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(easterNftAbi, getEasterNftAddress(), chainId, signer) as EasterNft
}
export const getCakeVaultV2Contract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bullVaultV2Abi, getCakeVaultAddress(chainId), chainId, signer) as BullVaultV2
}

export const getCakeFlexibleSideVaultV2Contract = (chainId, signer?: Signer | Provider) => {
  return getContract(bullFlexibleSideVaultV2Abi, getCakeFlexibleSideVaultAddress(chainId), chainId, signer) as BullFlexibleSideVaultV2
}

export const getPredictionsContract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(predictionsAbi, address, chainId, signer) as Predictions
}

export const getPredictionsV1Contract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(predictionsV1Abi, getPredictionsV1Address(), chainId, signer) as PredictionsV1
}

export const getCakePredictionsContract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(cakePredictionsAbi, address, chainId, signer) as Predictions
}

export const getChainlinkOracleContract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(chainlinkOracleAbi, address, chainId, signer) as ChainlinkOracle
}
export const getMulticallContract = (chainId?: number) => {
  const provider = chainId === ChainId.BSC_TESTNET ? goerliRpcProvider : ethRpcProvider
  return getContract(MultiCallAbi, getMulticallAddress(chainId), chainId, provider) as Multicall
}
export const getBunnySpecialCakeVaultContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(), chainId, signer) as BunnySpecialCakeVault
}
export const getBunnySpecialPredictionContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), chainId, signer) as BunnySpecialPrediction
}
export const getBunnySpecialLotteryContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), chainId, signer) as BunnySpecialLottery
}
export const getBunnySpecialXmasContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bunnySpecialXmasAbi, getBunnySpecialXmasAddress(), chainId, signer)
}
export const getFarmAuctionContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), chainId, signer) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), chainId, signer) as AnniversaryAchievement
}

export const getNftMarketContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(nftMarketAbi, getNftMarketAddress(), chainId, signer) as NftMarket
}
export const getNftSaleContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(nftSaleAbi, getNftSaleAddress(), chainId, signer) as NftSale
}
export const getPancakeSquadContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), chainId, signer) as PancakeSquad
}
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  const chainId = 5
  return getContract(erc721CollectionAbi, address, chainId, signer) as Erc721collection
}

export const getPotteryVaultContract = (address: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(potteryVaultAbi, address, chainId, signer) as PotteryVaultAbi
}

export const getPotteryDrawContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(potteryDrawAbi, getPotteryDrawAddress(), chainId, signer) as PotteryDrawAbi
}

export const getZapContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(zapAbi, getZapAddress(), chainId, signer) as Zap
}

export const getIfoCreditAddressContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(iBullAbi, getICakeAddress(), chainId, signer) as IBull
}

export const getBCakeFarmBoosterContract = (chainId: number, signer?: Signer | Provider) => {
  return getContract(bBullFarmBoosterAbi, getBCakeFarmBoosterAddress(chainId), chainId, signer) as BBullFarmBooster
}

export const getBCakeFarmBoosterProxyFactoryContract = (signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(
    bBullFarmBoosterProxyFactoryAbi,
    getBCakeFarmBoosterProxyFactoryAddress(),
    chainId,
    signer,
  ) as BBullFarmBoosterProxyFactory
}

export const getBCakeProxyContract = (proxyContractAddress: string, signer?: Signer | Provider) => {
  const chainId = 5
  return getContract(bBullProxyAbi, proxyContractAddress, chainId, signer) as BBullProxy
}
