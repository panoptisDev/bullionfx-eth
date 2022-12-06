import { Flex, Button, Text } from '@pancakeswap/uikit'
import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from '@pancakeswap/localization'
import { useGasPriceManager, useSuitableGasPrice } from 'state/user/hooks'
// import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'

const GasSettings = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const [gasPrice, setGasPrice] = useGasPriceManager()
  const suitableGasPrice = useSuitableGasPrice()

  return (
    <Flex flexDirection="column">
      {chainId === ChainId.BSC && (
        <Flex mb="12px" alignItems="center">
          <Text>{t('Default Transaction Speed (GWEI)')}</Text>
          <QuestionHelper
            text={t(
              'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees',
            )}
            placement="top-start"
            ml="4px"
          />
        </Flex>
      )}
      <Flex flexWrap="wrap">
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            // setGasPrice(GAS_PRICE_GWEI.default)
            setGasPrice("default", (Number(suitableGasPrice) * 1.05).toFixed())
          }}
          // variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
          variant={gasPrice === "default" ? 'primary' : 'tertiary'}
        >
          {t('Standard (%gasPrice%)', { gasPrice: (Number(suitableGasPrice) / 1000000000).toFixed(2) })}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          scale="sm"
          onClick={() => {
            // setGasPrice(GAS_PRICE_GWEI.fast)
            setGasPrice("fast", (Number(suitableGasPrice) * 1.4).toFixed())
          }}
          // variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
          variant={gasPrice === "fast" ? 'primary' : 'tertiary'}
        >
          {t('Fast (%gasPrice%)', { gasPrice: (Number(suitableGasPrice) * 1.4 / 1000000000).toFixed(2) })}
        </Button>
        <Button
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            // setGasPrice(GAS_PRICE_GWEI.instant)
            setGasPrice("instant", (Number(suitableGasPrice) * 1.8).toFixed())
          }}
          // variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
          variant={gasPrice === "instant" ? 'primary' : 'tertiary'}
        >
          {t('Instant (%gasPrice%)', { gasPrice: (Number(suitableGasPrice) * 1.8 / 1000000000).toFixed(2) })}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GasSettings
