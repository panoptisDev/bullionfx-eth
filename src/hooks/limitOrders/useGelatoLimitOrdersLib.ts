import { useMemo } from 'react'
import { ChainId as ChainIdType, GelatoLimitOrders } from '@gelatonetwork/limit-orders-lib'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { GELATO_HANDLER } from 'config/constants/exchange'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'

const useGelatoLimitOrdersLib = (): GelatoLimitOrders | undefined => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner()
  return useMemo(() => {
    if (!chainId || !providerOrSigner) {
      console.error('Could not instantiate GelatoLimitOrders: missing chainId or library')
      return undefined
    }
    try {
      return new GelatoLimitOrders(chainId as ChainIdType, providerOrSigner, GELATO_HANDLER, false)
    } catch (error: any) {
      console.error(`Could not instantiate GelatoLimitOrders: ${error.message}`)
      return undefined
    }
  }, [chainId, providerOrSigner])
}

export default useGelatoLimitOrdersLib
