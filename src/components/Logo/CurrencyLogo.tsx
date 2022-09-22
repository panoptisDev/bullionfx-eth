import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import { GOLD } from 'config/constants/tokens'
import { useMemo } from 'react'
import { WrappedTokenInfo } from 'state/types'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'

const StyledLogo = styled(Logo) <{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return []

    if (currency?.isToken) {
      const tokenLogoURL = getTokenLogoURL(currency)

      if (currency.address.toLowerCase() === GOLD[currency.chainId].address.toLowerCase() && currency.chainId === ChainId.BSC) return [`/images/tokens/${currency.address}.png`]
      if (currency instanceof WrappedTokenInfo) {
        if (!tokenLogoURL) return [...uriLocations]
        return [...uriLocations, tokenLogoURL]
      }
      if (!tokenLogoURL) return currency.chainId === ChainId.BSC ? [`/images/tokens/${currency.address}.png`] : [`/images/tokens/testnet/${currency.address}.png`]
      return [tokenLogoURL]
    }
    return []
  }, [currency, uriLocations])

  if (currency?.isNative) {
    return <StyledLogo size={size} srcs={[`/images/chains/${currency.chainId || ChainId.BSC}.png`]} width={size} style={style} />
  }
  if (currency?.symbol === "BULL") {
    return <StyledLogo size={size} srcs={[`/images/chains/bull.webp`]} width={size} style={style} />
  }
  if (srcs.length === 0) {
    switch (currency?.chainId || ChainId.BSC) {
      case ChainId.BSC_TESTNET:
        if (currency instanceof Token || currency instanceof WrappedTokenInfo) srcs.push(`/images/tokens/testnet/${currency.address}.png`)
        break
      default:
        if (currency instanceof Token || currency instanceof WrappedTokenInfo) srcs.push(`/images/tokens/${currency.address}.png`)
        break
    }
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
