import { ChainId, Token, WNATIVE } from '@pancakeswap/sdk'

const BULL_MAINNET = new Token(
  ChainId.BSC,
  '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', // sushi token
  18,
  'SUSHI',
  'SushiToken',
  'https://sushi.com/',
)

const BULL_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0x927389C5890Dc1C9b1b61AEB3cbe64D1Bfb7bD5f',
  18,
  'BULL',
  'BullionFX',
  'https://bullionfx.com/',
)

const GOLD_MAINNET = new Token(
  ChainId.BSC,
  '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
  18,
  'GOLD',
  'GOLD',
  'https://bullionfx.com/'
)

const GOLD_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0xAE617d20232297FD2540c93b6fCc2475f11cdd67',
  18,
  'GOLD',
  'GOLD',
  'https://bullionfx.com/'
)

const USDC_MAINNET = new Token(
  ChainId.BSC,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  18,
  'USDC',
  'Tether USD',
  'https://www.centre.io/',
)

const USDC_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0xaDdF66e47873102Ec6e809aF57f407B3e865a790',
  18,
  'USDC',
  'USD Coin',
  'https://www.centre.io/',
)

export const USDC = {
  [ChainId.BSC]: USDC_MAINNET,
  [ChainId.BSC_TESTNET]: USDC_TESTNET
}

export const BULL = {
  [ChainId.BSC]: BULL_MAINNET,
  [ChainId.BSC_TESTNET]: BULL_TESTNET,
}

export const GOLD = {
  [ChainId.BSC]: GOLD_MAINNET,
  [ChainId.BSC_TESTNET]: GOLD_TESTNET,
}

export const ethTokens = {
  weth: WNATIVE[ChainId.BSC],
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  eth: new Token(
    ChainId.BSC,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'ETH',
    'ETH',
    'https://weth.io',
  ),
  bull: BULL_MAINNET,
  gold: GOLD_MAINNET,
  usdc: USDC_MAINNET,
}

export const bullionfxTokens = [
  "BULL",
  "GOLD",
  "USDC"
]

export const ethTokensGoerli = {
  weth: WNATIVE[ChainId.BSC_TESTNET],
  eth: new Token(
    ChainId.BSC,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'ETH',
    'ETH',
    'https://weth.io',
  ),
  bull: BULL_TESTNET,
  gold: GOLD_TESTNET,
  usdc: USDC_TESTNET,
  syrup: new Token(
    ChainId.BSC_TESTNET,
    '0x99616ecDb02400dddF9a67B3B84086D641e33EeC',
    18,
    'SYRUP',
    'SyrupBar Token',
    '',
  ),
}
