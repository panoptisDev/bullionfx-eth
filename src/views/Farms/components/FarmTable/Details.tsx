import styled from 'styled-components'
import { ChevronDownIcon, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon) <{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
`

const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  // const { isDesktop } = useMatchBreakpointsContext()

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Text style={{ fontSize: "16px", fontWeight: "600" }} color="secondary">{actionPanelToggled ? t('Hide') : t('Details')}</Text>
      <ArrowIcon color="secondary" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
