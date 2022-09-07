import { gql } from 'graphql-request'
import { infoClient, infoClientTestnet } from 'utils/graphql'
import { ChartEntry } from 'state/info/types'
import { PCS_V2_START, PCS_V2_START_GOERLI } from 'config/constants/info'
import { PairDayDatasResponse } from '../types'
import { mapPairDayData, fetchChartData } from '../helpers'
import { ChainId } from '../../../../../packages/swap-sdk/src/constants'

const getPoolChartData = async (skip: number, chainId: number, address: string): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  try {
    const query = gql`
      query pairDayDatas($startTime: Int!, $skip: Int!, $address: Bytes!) {
        pairDayDatas(
          first: 1000
          skip: $skip
          where: { pairAddress: $address, date_gt: $startTime }
          orderBy: date
          orderDirection: asc
        ) {
          date
          dailyVolumeUSD
          reserveUSD
        }
      }
    `
    const client = chainId === ChainId.BSC_TESTNET ? infoClientTestnet : infoClient
    const { pairDayDatas } = await client.request<PairDayDatasResponse>(query, {
      startTime: chainId === ChainId.BSC_TESTNET ? PCS_V2_START_GOERLI : PCS_V2_START,
      skip,
      address,
    })
    const data = pairDayDatas.map(mapPairDayData)
    return { data, error: false }
  } catch (error) {
    console.error('Failed to fetch pool chart data', error)
    return { error: true }
  }
}

const fetchPoolChartData = async (address: string, chainId): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  return fetchChartData(getPoolChartData, chainId, address)
}

export default fetchPoolChartData
