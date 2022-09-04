import { serializeTokens } from 'utils/serializeTokens'
import { ethTokensGoerli } from './tokens'
import { SerializedFarmConfig } from './types'

// const serializedTokens = serializeTokens(ethTokens)
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
  //     5: '0x589dce1954803B52b417182B026F71E40d138Ac2',
  //     1: '',
  //   },
  //   token: serializedTokens.syrup,
  //   quoteToken: serializedTokens.wbnb,
  // },

]

export const farmsTestnet: SerializedFarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'BULL-USDC LP',
    lpAddresses: {
      5: '0x1B48401Ed178027ADaC9e37878dDC8D676B3eF46',
      1: '',
    },
    token: serializedTokensTestnet.bull,
    quoteToken: serializedTokensTestnet.usdc,
  },
  {
    pid: 2,
    lpSymbol: 'GOLD-USDC LP',
    lpAddresses: {
      5: '0x5d2c3A0C4F2d5338F4871c4aF1a95ac453b12f33',
      1: '',
    },
    token: serializedTokensTestnet.gold,
    quoteToken: serializedTokensTestnet.usdc,
  },
]

export default farms
