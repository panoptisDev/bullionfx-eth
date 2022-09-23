import { Currency } from '@pancakeswap/sdk'
import { GOLD, BULL, USDC } from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import currencyId from 'utils/currencyId'

export const useCurrencySelectRoute = () => {
  const router = useRouter()
  const { chainId } = useActiveWeb3React()
  const goldToken = GOLD[chainId]
  const bullToken = BULL[chainId]
  const usdcToken = USDC[chainId]
  const [currencyIdA, currencyIdB] = router.query.currency || []

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        router.replace(`/add/${currencyIdB}/${currencyIdA}`, undefined, { shallow: true })
      } else if (currencyIdB) {
        router.replace(`/add/${newCurrencyIdA}/${currencyIdB}`, undefined, { shallow: true })
      } else {
        router.replace(`/add/${newCurrencyIdA}`, undefined, { shallow: true })
      }
    },
    [currencyIdB, router, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          router.replace(`/add/${currencyIdB}/${newCurrencyIdB}`, undefined, { shallow: true })
        } else {
          router.replace(`/add/${newCurrencyIdB}`, undefined, { shallow: true })
        }
      } else if (currencyIdA) {
        router.replace(`/add/${currencyIdA}/${newCurrencyIdB}`, undefined, { shallow: true })
      } else if (newCurrencyIdB === goldToken?.address || newCurrencyIdB === bullToken?.address) {
        router.replace(`/add/${usdcToken?.address}/${newCurrencyIdB}`, undefined, { shallow: true })
      } else if (newCurrencyIdB === usdcToken?.address) {
        router.replace(`/add/${goldToken?.address}/${newCurrencyIdB}`, undefined, { shallow: true })
      }
    },
    [currencyIdA, router, currencyIdB, bullToken, goldToken, usdcToken],
  )

  return {
    handleCurrencyASelect,
    handleCurrencyBSelect,
  }
}
