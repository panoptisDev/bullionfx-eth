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
