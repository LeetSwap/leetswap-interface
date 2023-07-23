import { Token } from '@uniswap/sdk-core'

import { WETH, Eth } from './native-token'

import { ChainId } from 'constants/chains'
import { MAINNET, TESTNET } from './periphery'

export { WETH, Eth }

export const ETH = Eth.onChain(ChainId.MAINNET)

export const USDC = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7d43AABC515C356145049227CeE54B608342c0ad', 18, 'BUSD', 'BUSD (via Celer.Network)'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, TESTNET.mockUSDC, 18, 'MUSDC', 'Mock USDC'),
}

/**
 * LeetSwap
 */

export const DIFFUSION = makeToken('Leet', 'LEET', 18, {
  [ChainId.MAINNET]: MAINNET.diffusion,
  [ChainId.TESTNET]: TESTNET.diffusion || '0x067eC87844fBD73eDa4a1059F30039584586e09d',
})

export const XDIFFUSION = makeToken('xLEET', 'XLEET', 18, {
  [ChainId.MAINNET]: MAINNET.diffusionbar,
  [ChainId.TESTNET]: TESTNET.diffusionbar,
})

function makeToken(name: string, symbol: string, decimals: number, addresses: Record<ChainId, string>) {
  return {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, addresses[ChainId.MAINNET], decimals, symbol, name),
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, `M${symbol}`, `Mock ${name}`),
  }
}
