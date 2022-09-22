import JSBI from 'jsbi'
import { Token } from './entities/token'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  BSC = 1,
  BSC_TESTNET = 5,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

// // TODO: ETH This is test version, do not depends on it
export const FACTORY_ADDRESS_ETH = '0x550fB01B6022fc986390f9a10278383F63d1b208'
const FACTORY_ADDRESS_GOERLI = '0x481A2cdb80825372B9ec2cC91E82D9cC51c8316e'
const SUSHISWAP_FACTORY_ADDRESS_ETH = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'
const SUSHISWAP_FACTORY_ADDRESS_GOERLI = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.BSC]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC_TESTNET]: FACTORY_ADDRESS_GOERLI,
}

export const SUSHISWAP_FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.BSC]: SUSHISWAP_FACTORY_ADDRESS_ETH,
  [ChainId.BSC_TESTNET]: SUSHISWAP_FACTORY_ADDRESS_GOERLI
}

export const INIT_CODE_HASH = '0x7b63a42bbc2de07b2f4a75d700be0b3fda572fc2758462fc0d846a2641c075ce'
const INIT_CODE_HASH_GOERLI = '0x7b63a42bbc2de07b2f4a75d700be0b3fda572fc2758462fc0d846a2641c075ce'

export const SUSHISWAP_PAIR_CODE_HASH = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'
const SUSHISWAP_PAIR_CODE_HASH_GOERLI = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'

export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: INIT_CODE_HASH_GOERLI,
}

export const SUSHISWAP_PAIR_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.BSC]: SUSHISWAP_PAIR_CODE_HASH,
  [ChainId.BSC_TESTNET]: SUSHISWAP_PAIR_CODE_HASH_GOERLI
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _10000 = JSBI.BigInt(10000)

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}

export const WETH9 = {
  [ChainId.BSC]: new Token(
    ChainId.BSC,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WNATIVE: Record<number, Token> = {
  [ChainId.BSC]: WETH9[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WETH9[ChainId.BSC_TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.BSC]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.BSC_TESTNET]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
}
