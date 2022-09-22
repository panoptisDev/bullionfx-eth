import { serializeTokens } from 'utils/serializeTokens'
import { ethTokensGoerli, ethTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(ethTokens)
const serializedTokensTestnet = serializeTokens(ethTokensGoerli)

// export const CAKE_BNB_LP_MAINNET = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   v1pid: 0,
  //   lpSymbol: 'BULL',
  //   lpAddresses: {
  //     5: '',
  //     1: '0x1842eD4B402B10c4D06556A38C7E1F2fB136aD1C',
  //   },
  //   token: serializedTokens.syrup,
  //   quoteToken: serializedTokens.wbnb,
  // },
  {
    pid: 1,
    lpSymbol: 'BULL-USDC LP',
    lpAddresses: {
      5: '',
      1: '0xac8C3E409A7D0F154CdA57745cd00d6D7b50A9e6',
    },
    token: serializedTokens.bull,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 2,
    lpSymbol: 'GOLD-USDC LP',
    lpAddresses: {
      5: '',
      1: '0x58f6015b84837F83dd04D5b6c8533711301B2CBA',
    },
    token: serializedTokens.gold,
    quoteToken: serializedTokens.usdc,
  },
]

export const farmsTestnet: SerializedFarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'BULL-USDC LP',
    lpAddresses: {
      5: '0xf1C49EA3820FF22fcFad2521736b14122F832ce5',
      1: '',
    },
    token: serializedTokensTestnet.bull,
    quoteToken: serializedTokensTestnet.usdc,
  },
  {
    pid: 2,
    lpSymbol: 'GOLD-USDC LP',
    lpAddresses: {
      5: '0x0B3B8aF8255d32B13D57DaF4beB5CF9A1AC3c80C',
      1: '',
    },
    token: serializedTokensTestnet.gold,
    quoteToken: serializedTokensTestnet.usdc,
  },
]

export default farms
