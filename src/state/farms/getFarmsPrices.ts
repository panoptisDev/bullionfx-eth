import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { SerializedFarm } from 'state/types'
import { ethTokens } from 'config/constants/tokens'
import { ChainId } from '../../../packages/swap-sdk/src/constants'

const getFarmFromTokenSymbol = (
  farms: SerializedFarm[],
  tokenSymbol: string,
  preferredQuoteTokens?: string[],
): SerializedFarm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === ethTokens.usdc.symbol) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // if (farm.quoteToken.symbol === ethTokens.weth.symbol) {
  //   return hasTokenPriceVsQuote ? bnbPriceBusd.times(farm.tokenPriceVsQuote) : BIG_ZERO
  // }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or WBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  // if (quoteTokenFarm.quoteToken.symbol === ethTokens.weth.symbol) {
  //   const quoteTokenInBusd = bnbPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
  //   return hasTokenPriceVsQuote && quoteTokenInBusd
  //     ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
  //     : BIG_ZERO
  // }

  if (quoteTokenFarm.quoteToken.symbol === ethTokens.usdc.symbol) {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/WBNB quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  ethPriceUsdc: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === 'USDC') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'ETH') {
    return ethPriceUsdc
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'ETH') {
    return quoteTokenFarm.tokenPriceVsQuote ? ethPriceUsdc.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDC') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getFarmsPrices = (farms: SerializedFarm[], chainId?) => {
  if (chainId !== ChainId.BSC_TESTNET) {
    const ethUsdcFarm = farms.find((farm) => farm.token.symbol === 'USDC' && farm.quoteToken.symbol === 'ETH')
    const ethPriceUsdc = ethUsdcFarm.tokenPriceVsQuote ? BIG_ONE.div(ethUsdcFarm.tokenPriceVsQuote) : BIG_ZERO
    const farmsWithPrices = farms.map((farm) => {
      const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
      const tokenPriceBusd = getFarmBaseTokenPrice(farm, quoteTokenFarm)
      const quoteTokenPriceUsdc = getFarmQuoteTokenPrice(farm, quoteTokenFarm, ethPriceUsdc)

      return {
        ...farm,
        tokenPriceBusd: tokenPriceBusd.toJSON(),
        quoteTokenPriceUsdc: quoteTokenPriceUsdc.toJSON(),
      }
    })
    return farmsWithPrices
  }
  const farmsWithPrices = farms.map((farm) => {
    const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)
    const tokenPriceBusd = hasTokenPriceVsQuote ? BIG_ONE.times(farm.tokenPriceVsQuote) : BIG_ZERO
    const quoteTokenPriceUsdc = BIG_ONE
    return {
      ...farm,
      tokenPriceBusd: tokenPriceBusd.toJSON(),
      quoteTokenPriceUsdc: quoteTokenPriceUsdc.toJSON()
    }
  })
  return farmsWithPrices
}

export default getFarmsPrices
