import { Currency } from '@pancakeswap/sdk'
import { Box, Text, AddIcon, CardBody, Button, CardFooter } from '@pancakeswap/uikit'
import { CurrencySelect } from 'components/CurrencySelect'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FlexGap } from 'components/Layout/Flex'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BULL, GOLD } from 'config/constants/tokens'
import { BULL_USDC_LIQUIDITY_FEE, GOLD_USDC_LIQUIDITY_FEE } from 'config/constants'
import { AppHeader } from '../../components/App'
import { useCurrencySelectRoute } from './useCurrencySelectRoute'
import { CommonBasesType } from '../../components/SearchModal/types'

export function ChoosePair({
  currencyA,
  currencyB,
  error,
  onNext,
}: {
  currencyA?: Currency
  currencyB?: Currency
  error?: string
  onNext?: () => void
}) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const isValid = !error
  const { handleCurrencyASelect, handleCurrencyBSelect } = useCurrencySelectRoute()
  let liquidityFee
  if (currencyA && currencyB) {
    if (currencyA.symbol === BULL[currencyA.chainId].symbol || currencyB.symbol === BULL[currencyB.chainId].symbol) liquidityFee = BULL_USDC_LIQUIDITY_FEE
    if (currencyA.symbol === GOLD[currencyA.chainId].symbol || currencyB.symbol === GOLD[currencyB.chainId].symbol) liquidityFee = GOLD_USDC_LIQUIDITY_FEE
  } else if (!currencyA && !currencyB) liquidityFee = GOLD_USDC_LIQUIDITY_FEE

  return (
    <>
      <AppHeader
        title={t('Add Liquidity')}
        subtitle={liquidityFee ? t(`Receive LP tokens and earn ${liquidityFee}% trading fees`) : ''}
        helper={liquidityFee ? t(
          `Liquidity providers earn a ${liquidityFee}% trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.`,
        ) : ''}
        backTo="/liquidity"
      />
      <CardBody>
        <Box>
          <Text textTransform="uppercase" color="secondary" bold small pb="24px">
            {t('Choose a valid pair')}
          </Text>
          <FlexGap gap="4px">
            <CurrencySelect
              id="add-liquidity-select-tokena"
              selectedCurrency={currencyA}
              otherSelectedCurrency={currencyB}
              onCurrencySelect={handleCurrencyASelect}
              showCommonBases={false}
              commonBasesType={CommonBasesType.LIQUIDITY}
              chooseLiquidity
            />
            <AddIcon color="textSubtle" />
            <CurrencySelect
              id="add-liquidity-select-tokenb"
              selectedCurrency={currencyB}
              otherSelectedCurrency={currencyA}
              onCurrencySelect={handleCurrencyBSelect}
              showCommonBases={false}
              commonBasesType={CommonBasesType.LIQUIDITY}
              chooseLiquidity
            />
          </FlexGap>
        </Box>
      </CardBody>
      <CardFooter>
        {!account ? (
          <ConnectWalletButton width="100%" />
        ) : (
          <Button
            data-test="choose-pair-next"
            width="100%"
            variant={!isValid ? 'danger' : 'primary'}
            onClick={onNext}
            disabled={!isValid}
          >
            {error ?? t('Add Liquidity')}
          </Button>
        )}
      </CardFooter>
    </>
  )
}
