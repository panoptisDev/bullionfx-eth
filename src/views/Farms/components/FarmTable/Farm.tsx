import styled from 'styled-components'
import { useFarmUser } from 'state/farms/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { Text } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { TokenPairImage } from 'components/TokenImage'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`

const Farm: React.FunctionComponent<React.PropsWithChildren<FarmProps>> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondaryAlter" fontSize="12px" bold textTransform="uppercase">
          {t('Stake-Earn & more')}
        </Text>
      )
    }

    return null
  }
  const primaryToken = token.symbol === "BULL" || token.symbol === "GOLD" ? quoteToken : token
  const secondaryToken = token.symbol === "BULL" || token.symbol === "GOLD" ? token : quoteToken

  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage variant="inverted" primaryToken={primaryToken} secondaryToken={secondaryToken} width={40} height={40} />
      </TokenWrapper>
      <div>
        <Text bold>{label}</Text>
        {handleRenderFarming()}
      </div>
    </Container>
  )
}

export default Farm
