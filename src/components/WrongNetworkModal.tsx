import { Button, Grid, Modal, Text } from '@pancakeswap/uikit'
import { useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
// import Image from 'next/image'
import { useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import Icon from '@pancakeswap/uikit/src/components/Svg/Icons/Warning'
import Dots from './Loader/Dots'

export function WrongNetworkModal() {
  const { switchNetwork, isLoading } = useSwitchNetwork()
  const { chains } = useNetwork()
  const chainId = useLocalNetworkChain() || ChainId.BSC
  const { t } = useTranslation()

  const supportedMainnetChains = useMemo(() => chains.filter((chain) => !chain.testnet), [chains])

  return (
    <Modal title="Check your network" hideCloseButton headerBackground="gradients.cardHeader" bodyPadding='0px 20px 20px'>
      <Grid style={{ gap: '16px' }} maxWidth="370px">
        <Text style={{ textAlign: "center" }} smaller>
          {t('BullionFX is currently only on ')} {supportedMainnetChains?.map((c) => c.name).join(', ')}
        </Text>
        <div style={{ textAlign: 'center', background: '#35353588', width: '182px', height: '182px', borderRadius: '32px', margin: '32px auto' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon color='#ED6A5A' width='18px' height='18px' />
          <Text style={{ color: '#ED6A5A', fontSize: '12px', marginLeft: '3px' }}>Please switch your network to continue.</Text>
        </div>
        <Button isLoading={isLoading} onClick={() => switchNetwork(chainId)} height='56px' fontSize='16px' width='330px'>
          {isLoading ? <Dots>{t('Switch network in wallet')}</Dots> : t('Switch network in wallet')}
        </Button>
      </Grid>
    </Modal>
  )
}
