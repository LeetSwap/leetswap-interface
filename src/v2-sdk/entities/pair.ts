import { BigintIsh, Price, sqrt, Token, CurrencyAmount } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'
import JSBI from 'jsbi'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

import { INIT_CODE_HASH, MINIMUM_LIQUIDITY, FIVE, _997, _1000, ONE, ZERO } from '../constants'
import { InsufficientReservesError, InsufficientInputAmountError } from '../errors'
import { STABLE_PAIR_ADDRESSES, V2_FACTORY_ADDRESS } from 'constants/addresses'
import { ChainId } from 'constants/chains'

export const computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
  const stablePairAddress = getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address', 'bool'], [token0.address, token1.address, true])]),
    INIT_CODE_HASH
  )
  if (STABLE_PAIR_ADDRESSES[tokenA.chainId as ChainId].includes(stablePairAddress)) {
    return stablePairAddress
  }
  const volatilePairAddress = getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address', 'bool'], [token0.address, token1.address, false])]),
    INIT_CODE_HASH
  )
  return volatilePairAddress
}

export class Pair {
  public readonly liquidityToken: Token
  private readonly tokenAmounts: [CurrencyAmount<Token>, CurrencyAmount<Token>]

  public static getAddress(tokenA: Token, tokenB: Token): string {
    const factoryAddress = V2_FACTORY_ADDRESS[tokenA.chainId as ChainId]
    return computePairAddress({ factoryAddress, tokenA, tokenB })
  }

  public constructor(currencyAmountA: CurrencyAmount<Token>, tokenAmountB: CurrencyAmount<Token>) {
    const tokenAmounts = currencyAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
      ? [currencyAmountA, tokenAmountB]
      : [tokenAmountB, currencyAmountA]
    this.liquidityToken = new Token(
      tokenAmounts[0].currency.chainId,
      Pair.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency),
      18,
      'LEET-LP',
      'LeetSwap LP'
    )
    this.tokenAmounts = tokenAmounts as [CurrencyAmount<Token>, CurrencyAmount<Token>]
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  public get token0Price(): Price<Token, Token> {
    const result = this.tokenAmounts[1].divide(this.tokenAmounts[0])
    return new Price(this.token0, this.token1, result.denominator, result.numerator)
  }

  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1Price(): Price<Token, Token> {
    const result = this.tokenAmounts[0].divide(this.tokenAmounts[1])
    return new Price(this.token1, this.token0, result.denominator, result.numerator)
  }

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  public priceOf(token: Token): Price<Token, Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): number {
    return this.token0.chainId
  }

  public get token0(): Token {
    return this.tokenAmounts[0].currency
  }

  public get token1(): Token {
    return this.tokenAmounts[1].currency
  }

  public get reserve0(): CurrencyAmount<Token> {
    return this.tokenAmounts[0]
  }

  public get reserve1(): CurrencyAmount<Token> {
    return this.tokenAmounts[1]
  }

  public reserveOf(token: Token): CurrencyAmount<Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.reserve0 : this.reserve1
  }

  public getB (x:number, y:number, a:number):number {
    return -(2**(1/3) * (3 * a**4 + 12 * a**3 * x + 18 * a**2 * x**2 + 12 * a * x**3 + 3 * x**4))/(3 * (a + x) * (-27 * a**2 * x**3 * y - 27 * a**2 * x * y**3 + Math.sqrt((-27 * a**2 * x**3 * y - 27 * a**2 * x * y**3 - 54 * a * x**4 * y - 54 * a * x**2 * y**3 - 27 * x**5 * y - 27 * x**3 * y**3)**2 + 4 * (3 * a**4 + 12 * a**3 * x + 18 * a**2 * x**2 + 12 * a * x**3 + 3 * x**4)**3) - 54 * a * x**4 * y - 54 * a * x**2 * y**3 - 27 * x**5 * y - 27 * x**3 * y**3)**(1/3)) + (-27 * a**2 * x**3 * y - 27 * a**2 * x * y**3 + Math.sqrt((-27 * a**2 * x**3 * y - 27 * a**2 * x * y**3 - 54 * a * x**4 * y - 54 * a * x**2 * y**3 - 27 * x**5 * y - 27 * x**3 * y**3)**2 + 4 * (3 * a**4 + 12 * a**3 * x + 18 * a**2 * x**2 + 12 * a * x**3 + 3 * x**4)**3) - 54 * a * x**4 * y - 54 * a * x**2 * y**3 - 27 * x**5 * y - 27 * x**3 * y**3)**(1/3)/(3 * 2**(1/3) * (a + x)) + (a * y + x * y)/(a + x)
  }

  public getA (x:number, y:number, b:number):number {
    return (-27 * b**2 * x**3 * y - 27 * b**2 * x * y**3 + Math.sqrt((-27 * b**2 * x**3 * y - 27 * b**2 * x * y**3 + 54 * b * x**3 * y**2 + 54 * b * x * y**4 - 27 * x**3 * y**3 - 27 * x * y**5)**2 + 4 * (3 * b**4 - 12 * b**3 * y + 18 * b**2 * y**2 - 12 * b * y**3 + 3 * y**4)**3) + 54 * b * x**3 * y**2 + 54 * b * x * y**4 - 27 * x**3 * y**3 - 27 * x * y**5)**(1/3)/(3 * 2**(1/3) * (b - y)) - (2**(1/3) * (3 * b**4 - 12 * b**3 * y + 18 * b**2 * y**2 - 12 * b * y**3 + 3 * y**4))/(3 * (b - y) * (-27 * b**2 * x**3 * y - 27 * b**2 * x * y**3 + Math.sqrt((-27 * b**2 * x**3 * y - 27 * b**2 * x * y**3 + 54 * b * x**3 * y**2 + 54 * b * x * y**4 - 27 * x**3 * y**3 - 27 * x * y**5)**2 + 4 * (3 * b**4 - 12 * b**3 * y + 18 * b**2 * y**2 - 12 * b * y**3 + 3 * y**4)**3) + 54 * b * x**3 * y**2 + 54 * b * x * y**4 - 27 * x**3 * y**3 - 27 * x * y**5)**(1/3)) - (b * x - x * y)/(b - y)
  }
  
  public getOutputAmount(inputAmount: CurrencyAmount<Token>): [CurrencyAmount<Token>, Pair] {
    invariant(this.involvesToken(inputAmount.currency), 'TOKEN')
    if (JSBI.equal(this.reserve0.quotient, ZERO) || JSBI.equal(this.reserve1.quotient, ZERO)) {
      throw new InsufficientReservesError()
    }
    const inputReserve = this.reserveOf(inputAmount.currency)
    const outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0)
    if (STABLE_PAIR_ADDRESSES[inputAmount.currency.chainId as ChainId].includes(this.liquidityToken.address)) {
      const [iD, oD, asshole] = inputAmount.currency.equals(this.token0)
      ? [this.token0.decimals, this.token1.decimals, this.getB]
      : [this.token1.decimals, this.token0.decimals, this.getB]
      const adjustedDecimals = inputAmount.currency.equals(this.token0) ? this.token1.decimals : this.token0.decimals
      const bVal = JSBI.BigInt(Math.floor(
        asshole(
          parseFloat(inputReserve.toFixed(iD)),
          parseFloat(outputReserve.toFixed(oD)),
          parseFloat(inputAmount.toFixed(inputAmount.currency.decimals))
        )*(10**adjustedDecimals)
      ))
      const outputAmount = CurrencyAmount.fromRawAmount(
        inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
        bVal
      )
      if (JSBI.equal(outputAmount.quotient, ZERO)) {
        throw new InsufficientInputAmountError()
      }
      return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
    } else {
      const inputAmountWithFee = JSBI.multiply(inputAmount.quotient, _1000)
      const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient)
      const denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, _1000), inputAmountWithFee)
      const outputAmount = CurrencyAmount.fromRawAmount(
        inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
        JSBI.divide(numerator, denominator)
      )
      if (JSBI.equal(outputAmount.quotient, ZERO)) {
        throw new InsufficientInputAmountError()
      }
      return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
    }
  }

  public getInputAmount(outputAmount: CurrencyAmount<Token>): [CurrencyAmount<Token>, Pair] {
    console.log(outputAmount.toFixed(2))
    invariant(this.involvesToken(outputAmount.currency), 'TOKEN')
    if (
      JSBI.equal(this.reserve0.quotient, ZERO) ||
      JSBI.equal(this.reserve1.quotient, ZERO) ||
      JSBI.greaterThanOrEqual(outputAmount.quotient, this.reserveOf(outputAmount.currency).quotient)
    ) {
      throw new InsufficientReservesError()
    }
    const outputReserve = this.reserveOf(outputAmount.currency)
    const inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0)
    if (STABLE_PAIR_ADDRESSES[outputAmount.currency.chainId as ChainId].includes(this.liquidityToken.address)) {
      const [iD, oD, asshole] = !outputAmount.currency.equals(this.token0)
      ? [this.token0.decimals, this.token1.decimals, this.getA]
      : [this.token1.decimals, this.token0.decimals, this.getA]
      const adjustedDecimals = outputAmount.currency.equals(this.token0) ? this.token1.decimals : this.token0.decimals
      const bVal = JSBI.BigInt(Math.floor(
        asshole(
          parseFloat(inputReserve.toFixed(iD)),
          parseFloat(outputReserve.toFixed(oD)),
          parseFloat(outputAmount.toFixed(outputAmount.currency.decimals))
        )*(10**adjustedDecimals)
      ))
      const inputAmount = CurrencyAmount.fromRawAmount(
        outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
        bVal
      )
      if (JSBI.equal(outputAmount.quotient, ZERO)) {
        throw new InsufficientInputAmountError()
      }
      return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
    } else {
      const numerator = JSBI.multiply(JSBI.multiply(inputReserve.quotient, outputAmount.quotient), _1000)
      const denominator = JSBI.multiply(JSBI.subtract(outputReserve.quotient, outputAmount.quotient), _1000)
      const inputAmount = CurrencyAmount.fromRawAmount(
        outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
        JSBI.add(JSBI.divide(numerator, denominator), ONE)
      )
      return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))]
    }
  }

  public getLiquidityMinted(
    totalSupply: CurrencyAmount<Token>,
    tokenAmountA: CurrencyAmount<Token>,
    tokenAmountB: CurrencyAmount<Token>
  ): CurrencyAmount<Token> {
    invariant(totalSupply.currency.equals(this.liquidityToken), 'LIQUIDITY')
    const tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]
    invariant(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1), 'TOKEN')

    let liquidity: JSBI
    if (JSBI.equal(totalSupply.quotient, ZERO)) {
      liquidity = JSBI.subtract(
        sqrt(JSBI.multiply(tokenAmounts[0].quotient, tokenAmounts[1].quotient)),
        MINIMUM_LIQUIDITY
      )
    } else {
      const amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].quotient, totalSupply.quotient), this.reserve0.quotient)
      const amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].quotient, totalSupply.quotient), this.reserve1.quotient)
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return CurrencyAmount.fromRawAmount(this.liquidityToken, liquidity)
  }

  public getLiquidityValue(
    token: Token,
    totalSupply: CurrencyAmount<Token>,
    liquidity: CurrencyAmount<Token>,
    feeOn = false,
    kLast?: BigintIsh
  ): CurrencyAmount<Token> {
    invariant(this.involvesToken(token), 'TOKEN')
    invariant(totalSupply.currency.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    invariant(liquidity.currency.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(liquidity.quotient, totalSupply.quotient), 'LIQUIDITY')

    let totalSupplyAdjusted: CurrencyAmount<Token>
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply
    } else {
      invariant(!!kLast, 'K_LAST')
      const kLastParsed = JSBI.BigInt(kLast)
      if (!JSBI.equal(kLastParsed, ZERO)) {
        const rootK = sqrt(JSBI.multiply(this.reserve0.quotient, this.reserve1.quotient))
        const rootKLast = sqrt(kLastParsed)
        if (JSBI.greaterThan(rootK, rootKLast)) {
          const numerator = JSBI.multiply(totalSupply.quotient, JSBI.subtract(rootK, rootKLast))
          const denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast)
          const feeLiquidity = JSBI.divide(numerator, denominator)
          totalSupplyAdjusted = totalSupply.add(CurrencyAmount.fromRawAmount(this.liquidityToken, feeLiquidity))
        } else {
          totalSupplyAdjusted = totalSupply
        }
      } else {
        totalSupplyAdjusted = totalSupply
      }
    }

    if (JSBI.equal(totalSupplyAdjusted.quotient, JSBI.BigInt('0'))) {
      return CurrencyAmount.fromRawAmount(token, JSBI.BigInt('0'))
    } else {
      return CurrencyAmount.fromRawAmount(
        token,
        JSBI.divide(JSBI.multiply(liquidity.quotient, this.reserveOf(token).quotient), totalSupplyAdjusted.quotient)
      )
    }
  }
}

declare global {
  interface Window {
    $getPairAddress: (chainId: ChainId, a: string, b: string) => string
  }
}
window.$getPairAddress = (chainId: ChainId, a: string, b: string) => {
  const [token0, token1] = a.toLowerCase() < b.toLowerCase() ? [a, b] : [b, a] // does safety checks
  const stablePairAddress = getCreate2Address(
    V2_FACTORY_ADDRESS[chainId],
    keccak256(['bytes'], [pack(['address', 'address', 'bool'], [token0, token1, true])]),
    INIT_CODE_HASH
  )
  if (STABLE_PAIR_ADDRESSES[chainId].includes(stablePairAddress)) {
    return stablePairAddress
  }
  const volatilePairAddress = getCreate2Address(
    V2_FACTORY_ADDRESS[chainId],
    keccak256(['bytes'], [pack(['address', 'address', 'bool'], [token0, token1, false])]),
    INIT_CODE_HASH
  )
  return volatilePairAddress
}
