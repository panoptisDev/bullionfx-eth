import { useEffect } from 'react'
import { useBullUsdcPrice } from 'hooks/useUSDCPrice'

const useGetDocumentTitlePrice = () => {
  const bullPriceUsdc = useBullUsdcPrice()
  useEffect(() => {
    const bullPriceUsdcString = bullPriceUsdc ? bullPriceUsdc.toFixed(2) : ''
    document.title = `BullionFx - ${bullPriceUsdcString}`
  }, [bullPriceUsdc])
}
export default useGetDocumentTitlePrice
