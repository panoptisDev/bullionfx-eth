import { Token, Pair, ChainId, WNATIVE } from '@pancakeswap/sdk'
import { bullionfxTokens } from 'config/constants/tokens'
import { isAddress } from 'utils'

const getLpAddress = (token1: string | Token, token2: string | Token, chainId: number = ChainId.BSC) => {
  let _token1 = token1
  let _token2 = token2
  if (typeof _token1 === 'string' && _token1 === 'eth') _token1 = WNATIVE[chainId ?? ChainId.BSC].address
  if (typeof _token2 === 'string' && _token2 === 'eth') _token2 = WNATIVE[chainId ?? ChainId.BSC].address
  let token1AsTokenInstance = _token1
  let token2AsTokenInstance = _token2
  if (!_token1 || !_token2) {
    return null
  }
  if (typeof _token1 === 'string' || _token1 instanceof String) {
    const checksummedToken1Address = isAddress(_token1)
    if (!checksummedToken1Address) {
      return null
    }
    token1AsTokenInstance = new Token(chainId, checksummedToken1Address, 18)
  }
  if (typeof _token2 === 'string' || _token2 instanceof String) {
    const checksummedToken2Address = isAddress(_token2)
    if (!checksummedToken2Address) {
      return null
    }
    token2AsTokenInstance = new Token(chainId, checksummedToken2Address, 18)
  }

  const isBullionFXTokens = (token: Token) => {
    const result = bullionfxTokens[chainId ?? ChainId.BSC].find(each => token?.isToken && each.address === token?.address)
    if (result && result.length > 0) return true
    return false
  }
  if (isBullionFXTokens(token1AsTokenInstance as Token) && isBullionFXTokens(token2AsTokenInstance as Token)) return Pair.getAddress(token1AsTokenInstance as Token, token2AsTokenInstance as Token)
  return Pair.getSushiAddress(token1AsTokenInstance as Token, token2AsTokenInstance as Token)
}

export default getLpAddress
