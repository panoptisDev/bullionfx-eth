import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const ETH_PROD_NODE = 'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'
export const GOERLI_PROD_NODE = 'https://eth-goerli.nodereal.io/v1/8a4432e42df94dcca2814fde8aea2a2e'

export const ethRpcProvider = new StaticJsonRpcProvider(ETH_PROD_NODE)
export const goerliRpcProvider = new StaticJsonRpcProvider(GOERLI_PROD_NODE)

export default null
