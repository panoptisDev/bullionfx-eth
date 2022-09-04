import { Text, Flex, Image, Box } from '@pancakeswap/uikit'
import { BalanceWithLoading } from 'components/Balance'
import Divider from 'components/Divider'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { StaticAmountPropsType } from '../types'
import { ChainId } from '../../../../../../packages/swap-sdk/src/constants'

const StaticAmount: React.FC<React.PropsWithChildren<StaticAmountPropsType>> = ({
  stakingSymbol,
  stakingAddress,
  lockedAmount,
  usdValueStaked,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const _url = chainId === ChainId.BSC_TESTNET ? `/images/tokens/testnet/${stakingAddress}.png` : `/images/tokens/${stakingAddress}.png`

  return (
    <>
      <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
        {t('Add BULL to lock')}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Box>
          <BalanceWithLoading color="text" bold fontSize="16px" value={lockedAmount} decimals={2} />
          <BalanceWithLoading
            value={usdValueStaked}
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            prefix="~"
            unit=" USD"
          />
        </Box>
        <Flex alignItems="center" minWidth="70px">
          <Image src={_url} width={24} height={24} alt={stakingSymbol} />
          <Text ml="4px" bold>
            {stakingSymbol}
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default StaticAmount
