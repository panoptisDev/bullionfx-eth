import { Token, CurrencyAmount, ChainId } from '@pancakeswap/sdk'
import { BULL, GOLD, USDC } from 'config/constants/tokens'
import { useMemo } from 'react'
import { useAllTokenBalances } from '../../state/wallet/hooks'

// compare two token amounts with highest one coming first
function balanceComparator(balanceA?: CurrencyAmount<Token>, balanceB?: CurrencyAmount<Token>) {
  if (balanceA && balanceB) {
    return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1
  }
  if (balanceA && balanceA.greaterThan('0')) {
    return -1
  }
  if (balanceB && balanceB.greaterThan('0')) {
    return 1
  }
  return 0
}

function getTokenComparator(balances: {
  [tokenAddress: string]: CurrencyAmount<Token> | undefined
}, defaultTopTokens): (tokenA: Token, tokenB: Token) => number {
  return function sortTokens(tokenA: Token, tokenB: Token): number {
    // -1 = a is first
    // 1 = b is first

    // sort by balances
    const balanceA = balances[tokenA.address]
    const balanceB = balances[tokenB.address]

    const balanceComp = balanceComparator(balanceA, balanceB)
    if (balanceComp !== 0) return balanceComp

    if (tokenA.symbol && tokenB.symbol) {
      const tokenAIndex = defaultTopTokens.indexOf(tokenA.address.toLowerCase())
      const tokenBIndex = defaultTopTokens.indexOf(tokenB.address.toLowerCase())
      if (tokenAIndex !== -1 || tokenBIndex !== -1) {
        return tokenAIndex === -1 ? 1 : tokenBIndex === -1 ? -1 : tokenAIndex < tokenBIndex ? -1 : 1
      }
      // sort by symbol
      return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1
    }
    return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0
  }
}

function useTokenComparator(inverted: boolean, chainId: number): (tokenA: Token, tokenB: Token) => number {
  const balances = useAllTokenBalances()
  const defaultTopTokens = useMemo(() => {
    return [
      BULL[chainId ?? ChainId.BSC].address.toLowerCase(),
      GOLD[chainId ?? ChainId.BSC].address.toLowerCase(),
      USDC[chainId ?? ChainId.BSC].address.toLowerCase()
    ]
  }, [chainId])
  const comparator = useMemo(() => getTokenComparator(balances ?? {}, defaultTopTokens), [balances, defaultTopTokens])
  return useMemo(() => {
    if (inverted) {
      return (tokenA: Token, tokenB: Token) => comparator(tokenA, tokenB) * -1
    }
    return comparator
  }, [inverted, comparator])
}

export default useTokenComparator
