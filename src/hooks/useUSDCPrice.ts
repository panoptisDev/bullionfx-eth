import { Currency, JSBI, Price, WNATIVE } from '@pancakeswap/sdk'
import { defaultChainId } from 'config'
import { BULL, USDC } from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { PairState, usePairs } from './usePairs'

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useUSDCPrice(currency?: Currency): Price<Currency, Currency> | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = currency?.wrapped
  const wnative = WNATIVE[chainId] || WNATIVE[defaultChainId]
  const usdc = USDC[chainId] || USDC[defaultChainId]

  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && wnative?.equals(wrapped) ? undefined : currency, chainId ? wnative : undefined],
      [wrapped?.equals(usdc) ? undefined : wrapped, usdc],
      [chainId ? wnative : undefined, usdc],
    ],
    [wnative, usdc, chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [usdcPairState, usdcPair], [usdcEthPairState, usdcEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wbnb/bnb
    if (wrapped.equals(wnative)) {
      if (usdcPair) {
        const price = usdcPair.priceOf(wnative)
        return new Price(currency, usdc, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(usdc)) {
      return new Price(usdc, usdc, '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(wnative)
    const ethPairETHUSDCValue: JSBI =
      ethPairETHAmount && usdcEthPair ? usdcEthPair.priceOf(wnative).quote(ethPairETHAmount).quotient : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (usdcPairState === PairState.EXISTS && usdcPair && usdcPair.reserveOf(usdc).greaterThan(ethPairETHUSDCValue)) {
      const price = usdcPair.priceOf(wrapped)
      return new Price(currency, usdc, price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && usdcEthPairState === PairState.EXISTS && usdcEthPair) {
      if (usdcEthPair.reserveOf(usdc).greaterThan('0') && ethPair.reserveOf(wnative).greaterThan('0')) {
        const ethUsdcPrice = usdcEthPair.priceOf(usdc)
        const currencyEthPrice = ethPair.priceOf(wnative)
        const usdcPrice = ethUsdcPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, usdc, usdcPrice.denominator, usdcPrice.numerator)
      }
    }

    return undefined
  }, [
    currency,
    wrapped,
    chainId,
    wnative,
    usdc,
    ethPair,
    usdcEthPair,
    usdcPairState,
    usdcPair,
    ethPairState,
    usdcEthPairState,
  ])
}

export const useBullUsdcPrice = (): Price<Currency, Currency> | undefined => {
  const { chainId } = useActiveWeb3React()
  const bullUsdcPrice = useUSDCPrice(BULL[chainId])
  return bullUsdcPrice
}

export const useUSDCCurrencyAmount = (currency?: Currency, amount?: number): number | undefined => {
  const usdcPrice = useUSDCPrice(currency)
  if (!amount) {
    return undefined
  }
  if (usdcPrice) {
    return multiplyPriceByAmount(usdcPrice, amount)
  }
  return undefined
}

export const useUSDCBullAmount = (amount: number): number | undefined => {
  const bullUsdcPrice = useBullUsdcPrice()
  if (bullUsdcPrice) {
    return multiplyPriceByAmount(bullUsdcPrice, amount)
  }
  return undefined
}

export const useETHUsdcPrice = (): Price<Currency, Currency> | undefined => {
  const { chainId } = useActiveWeb3React()
  const ethUsdcPrice = useUSDCPrice(WNATIVE[chainId])
  return ethUsdcPrice
}
