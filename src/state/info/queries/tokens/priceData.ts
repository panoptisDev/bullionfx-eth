import { getUnixTime } from 'date-fns'
import { gql } from 'graphql-request'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'
import { multiQuery } from 'views/Info/utils/infoQueryHelpers'
import { PriceChartEntry } from 'state/info/types'
import { INFO_CLIENT } from 'config/constants/endpoints'
import orderBy from 'lodash/orderBy'

const getPriceSubqueries = (tokenAddress: string, blocks: any) =>
  blocks.map(
    (block: any) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
        derivedUSD
      }
    `,
  )

/**
 * Price data for token and eth based on block number
 */
const priceQueryConstructor = (subqueries: string[]) => {
  return gql`
    query tokenPriceData {
      ${subqueries}
    }
  `
}

const fetchTokenPriceData = async (
  address: string,
  interval: number,
  startTimestamp: number,
  chainId: number
): Promise<{
  data?: PriceChartEntry[]
  error: boolean
}> => {
  // Construct timestamps to query against
  const endTimestamp = getUnixTime(new Date())
  const timestamps = []
  let time = startTimestamp
  while (time <= endTimestamp) {
    timestamps.push(time)
    time += interval
  }
  try {
    const blocks = await getBlocksFromTimestamps(timestamps, chainId, 'asc', 500)
    if (!blocks || blocks.length === 0) {
      console.error('Error fetching blocks for timestamps', timestamps)
      return {
        error: false,
      }
    }

    const prices: any | undefined = await multiQuery(
      priceQueryConstructor,
      getPriceSubqueries(address, blocks),
      INFO_CLIENT,
      200,
    )

    if (!prices) {
      console.error('Price data failed to load')
      return {
        error: false,
      }
    }

    // format token BNB price results
    const tokenPrices: {
      timestamp: string
      priceUSD: number
    }[] = []

    // Get Token prices in BNB
    Object.keys(prices).forEach((priceKey) => {
      const timestamp = priceKey.split('t')[1]
      // if its BNB price e.g. `b123` split('t')[1] will be undefined and skip BNB price entry
      if (timestamp) {
        tokenPrices.push({
          timestamp,
          priceUSD: prices[priceKey]?.derivedUSD ? parseFloat(prices[priceKey].derivedUSD) : 0,
        })
      }
    })

    // Go through BNB USD prices and calculate Token price based on it
    // Object.keys(prices).forEach((priceKey) => {
    //   const timestamp = priceKey.split('b')[1]
    //   // if its Token price e.g. `t123` split('b')[1] will be undefined and skip Token price entry
    //   if (timestamp) {
    //     const tokenPriceIndex = tokenPrices.findIndex((tokenPrice) => tokenPrice.timestamp === timestamp)
    //     if (tokenPriceIndex >= 0) {
    //       const { derivedUSD } = tokenPrices[tokenPriceIndex]
    //       tokenPrices[tokenPriceIndex].priceUSD = parseFloat(prices[priceKey]?.bnbPrice ?? 0) * derivedETH
    //     }
    //   }
    // })

    // graphql-request does not guarantee same ordering of batched requests subqueries, hence sorting by timestamp from oldest to newest
    const sortedTokenPrices = orderBy(tokenPrices, (tokenPrice) => parseInt(tokenPrice.timestamp, 10))

    const formattedHistory = []

    // for each timestamp, construct the open and close price
    for (let i = 0; i < sortedTokenPrices.length - 1; i++) {
      formattedHistory.push({
        time: parseFloat(sortedTokenPrices[i].timestamp),
        open: sortedTokenPrices[i].priceUSD,
        close: sortedTokenPrices[i + 1].priceUSD,
        high: sortedTokenPrices[i + 1].priceUSD,
        low: sortedTokenPrices[i].priceUSD,
      })
    }

    return { data: formattedHistory, error: false }
  } catch (error) {
    console.error(`Failed to fetch price data for token ${address}`, error)
    return {
      error: true,
    }
  }
}

export default fetchTokenPriceData
