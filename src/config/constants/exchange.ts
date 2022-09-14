import { ChainId, JSBI, Percent, Token, WNATIVE, WETH9 } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { BULL, ethTokens, ethTokensGoerli, GOLD, USDC } from './tokens'
import { ChainMap, ChainTokenList } from './types'

export const ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x02c6594bD3ca0c59A8d801C297Ee5Df4B915F104',
}

export const SUSHISWAP_ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.BSC]: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
  [ChainId.BSC_TESTNET]: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.BSC]: [
    WNATIVE[ChainId.BSC],
    USDC[ChainId.BSC],
    WETH9[ChainId.BSC],
  ],
  [ChainId.BSC_TESTNET]: [WNATIVE[ChainId.BSC_TESTNET], USDC[ChainId.BSC_TESTNET], WETH9[ChainId.BSC_TESTNET]],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.BSC]: [BULL[ChainId.BSC], GOLD[ChainId.BSC], USDC[ChainId.BSC]],
  [ChainId.BSC_TESTNET]: [BULL[ChainId.BSC_TESTNET], GOLD[ChainId.BSC_TESTNET], USDC[ChainId.BSC_TESTNET]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.BSC]: [
    USDC[ChainId.BSC],
    WNATIVE[ChainId.BSC],
  ],
  [ChainId.BSC_TESTNET]: [USDC[ChainId.BSC_TESTNET], WNATIVE[ChainId.BSC_TESTNET]],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSC]: [
    [ethTokens.bull, USDC[ChainId.BSC]],
  ],
  [ChainId.BSC_TESTNET]: [
    [ethTokensGoerli.bull, USDC[ChainId.BSC_TESTNET]],
  ],
}

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_TEN = JSBI.BigInt(10)

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE = new Percent(JSBI.BigInt(30), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// BNB
export const DEFAULT_INPUT_CURRENCY = 'USDC'
// CAKE
export const DEFAULT_OUTPUT_CURRENCY = 'GOLD'

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const LIMIT_ORDERS_DOCS_URL = 'https://docs.pancakeswap.finance/products/pancakeswap-exchange/limit-orders'
