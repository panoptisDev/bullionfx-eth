/* eslint-disable no-await-in-loop */
import { PCS_V2_START, PCS_V2_START_GOERLI } from 'config/constants/info'
import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { ChartEntry } from 'state/info/types'
import { infoClient, infoClientTestnet } from 'utils/graphql'
import { ChainId } from '../../../../../packages/swap-sdk/src/constants'
import { fetchChartData, mapDayData } from '../helpers'
import { PancakeDayDatasResponse } from '../types'

/**
 * Data for displaying Liquidity and Volume charts on Overview page
 */
const PANCAKE_DAY_DATAS = gql`
  query overviewCharts($startTime: Int!, $skip: Int!) {
    bullionFXDayDatas(first: 1000, skip: $skip, where: { date_gt: $startTime }, orderBy: date, orderDirection: asc) {
      date
      dailyVolumeUSD
      totalLiquidityUSD
    }
  }
`

const getOverviewChartData = async (skip: number, chainId: number): Promise<{ data?: ChartEntry[]; error: boolean }> => {
  try {
    const client = chainId === ChainId.BSC_TESTNET ? infoClientTestnet : infoClient
    const startTime = chainId === ChainId.BSC_TESTNET ? PCS_V2_START_GOERLI : PCS_V2_START
    const { pancakeDayDatas } = await client.request<PancakeDayDatasResponse>(PANCAKE_DAY_DATAS, {
      startTime,
      skip,
    })
    const data = pancakeDayDatas.map(mapDayData)
    return { data, error: false }
  } catch (error) {
    console.error(chainId, 'Failed to fetch overview chart data', error)
    return { error: true }
  }
}

/**
 * Fetch historic chart data
 */
const useFetchGlobalChartData = (chainId): {
  error: boolean
  data: ChartEntry[] | undefined
} => {
  const [overviewChartData, setOverviewChartData] = useState<ChartEntry[] | undefined>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchChartData(getOverviewChartData, chainId)
      if (data) {
        setOverviewChartData(data)
      } else {
        setError(true)
      }
    }
    if (!overviewChartData && !error) {
      fetch()
    }
  }, [overviewChartData, error, chainId])

  return {
    error,
    data: overviewChartData,
  }
}

export default useFetchGlobalChartData
