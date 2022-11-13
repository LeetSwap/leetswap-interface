import { ChainId } from './chains'
import { Token } from '../sdk-core/entities/token'
import { NativeCurrency } from '../sdk-core/entities/nativeCurrency'
import invariant from 'tiny-invariant'
import { WETH9_ADDRESS } from './addresses'

export const WCANTO = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, WETH9_ADDRESS[ChainId.MAINNET], 18, 'wCANTO', 'Wrapped Canto'),
  [ChainId.TESTNET]: new Token(ChainId.TESTNET, WETH9_ADDRESS[ChainId.TESTNET], 18, 'wCANTO', 'Wrapped Canto'),
}
export const WETH9 = WCANTO

export class Canto extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'CANTO', 'Canto')
  }

  public get wrapped(): Token {
    const weth9 = WCANTO[this.chainId as ChainId]
    invariant(!!weth9, 'WRAPPED')
    return weth9
  }

  private static _etherCache: { [chainId: number]: Canto } = {}

  public static onChain(chainId: number): Canto {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new Canto(chainId))
  }

  public equals(other: NativeCurrency | Token): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
