import { Token } from '@uniswap/sdk-core'

import { WCANTO, Canto } from './native-token'

import { ChainId } from 'constants/chains'
import { MAINNET, TESTNET } from './periphery'

export { WCANTO, Canto }

export const CANTO = Canto.onChain(ChainId.MAINNET)

/**
 * CantoDEX Tokens
 */

export const NOTE = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x4e71A2E537B7f9D9413D3991D37958c0b5e1e503', 18, 'NOTE', 'Note'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f', 18, 'NOTE', 'Note'),
}

export const USDC = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd', 6, 'USDC', 'USDC'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0xc51534568489f47949A828C8e3BF68463bdF3566', 6, 'USDC', 'USDC'),
}

export const USDT = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75', 6, 'USDT', 'USDT'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0x4fC30060226c45D8948718C95a78dFB237e88b40', 6, 'USDT', 'USDT'),
}

export const ATOM = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265', 6, 'ATOM', 'Atom'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0x40E41DC5845619E7Ba73957449b31DFbfB9678b2', 6, 'ATOM', 'Atom'),
}

export const ETH = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687', 18, 'ETH', 'Ether'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, '0xCa03230E7FB13456326a234443aAd111AC96410A', 18, 'ETH', 'Ether'),
}

export const CINU = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7264610A66EcA758A8ce95CF11Ff5741E1fd0455', 18, 'cINU', 'CANTO INU'),
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
    [ChainId.TESTNET]: new Token(ChainId.TESTNET, addresses[ChainId.TESTNET], decimals, `${symbol}`, `${name}`),
  }
}
