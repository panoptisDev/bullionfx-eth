import { CurrencyAmount, Pair, Currency, ChainId } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import IBullPairABI from 'config/abi/IBullPair.json'
import { Interface } from '@ethersproject/abi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { bullionfxTokens } from 'config/constants/tokens'

import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const PAIR_INTERFACE = new Interface(IBullPairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { chainId } = useActiveWeb3React()

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => [
        wrappedCurrency(currencyA, chainId),
        wrappedCurrency(currencyB, chainId),
      ]),
    [chainId, currencies],
  )

  const pairAddresses = useMemo(
    () => {
      const isBullionFXTokens = (token: Currency | undefined) => {
        const result = bullionfxTokens[chainId ?? ChainId.BSC]?.find(each => token?.isToken && each.address.toLowerCase() === token?.address.toLowerCase())
        if (result) return true
        return false
      }
      return tokens.map(([tokenA, tokenB]) => {
        if (isBullionFXTokens(tokenA) && isBullionFXTokens(tokenB)) {
          try {
            return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
          } catch (error: any) {
            // Debug Invariant failed related to this line
            console.error(
              error.msg,
              `- pairAddresses: ${tokenA?.address}-${tokenB?.address}`,
              `chainId: ${tokenA?.chainId}`,
            )

            return undefined
          }
        }
        try {
          return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getSushiAddress(tokenA, tokenB) : undefined
        } catch (error: any) {
          // Debug Invariant failed related to this line
          console.error(
            error.msg,
            `- pairAddresses: ${tokenA?.address}-${tokenB?.address}`,
            `chainId: ${tokenA?.chainId}`,
          )

          return undefined
        }
      })
    },
    [tokens, chainId],
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
        ),
      ]
    })
  }, [results, tokens])
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const pairCurrencies = useMemo<[Currency, Currency][]>(() => [[tokenA, tokenB]], [tokenA, tokenB])
  return usePairs(pairCurrencies)[0]
}
