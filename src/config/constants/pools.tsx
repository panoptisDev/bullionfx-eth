import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { serializeTokens } from 'utils/serializeTokens'
import { ethTokens, ethTokensGoerli } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

// const serializedTokens = serializeTokens(ethTokens)
const serializedTokensTestnet = serializeTokens(ethTokensGoerli)

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto CAKE</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000,
    tokenImage: {
      primarySrc: `/images/tokens/testnet/${ethTokensGoerli.bull.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake BULL</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/testnet/${ethTokensGoerli.bull.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible BULL</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/testnet/${ethTokensGoerli.bull.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO CAKE',
    description: <Trans>Stake CAKE to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${ethTokens.bull.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: SerializedPoolConfig[] = [

  // {
  //   sousId: 0,
  //   stakingToken: serializedTokens.bull,
  //   earningToken: serializedTokens.bull,
  //   contractAddress: {
  //     5: '',
  //     1: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.25',
  //   isFinished: false,
  // },
  // {
  //   sousId: 1,
  //   stakingToken: serializedTokens.gold,
  //   earningToken: serializedTokens.bull,
  //   contractAddress: {
  //     5: '',
  //     1: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.05',
  //   isFinished: false,
  // },
]

export const livePoolsTestnet: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokensTestnet.bull,
    earningToken: serializedTokensTestnet.bull,
    contractAddress: {
      5: '0x406647eA55c99e1690ce1E68aE8ff4DAe2662698',
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.25',
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: serializedTokensTestnet.gold,
    earningToken: serializedTokensTestnet.bull,
    contractAddress: {
      5: '0xCddA4A00b194c9FA16c88E7Ecb6408170f9Dd514',
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.05',
    isFinished: false,
  },
]

// known finished pools
const finishedPools = [
].map((p) => ({ ...p, isFinished: true }))

export const poolsTestnet = [...livePoolsTestnet]

export default [...livePools, ...finishedPools]
