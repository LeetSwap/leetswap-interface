import { Currency, CurrencyAmount, Price, Token } from '@uniswap/sdk-core'
import { useMemo } from 'react'
import { USDC } from '../constants/tokens'
import { useV2TradeExactOut } from './useV2Trade'
import { useActiveWeb3React } from './web3'
import { ChainId } from 'constants/chains'
import JSBI from 'jsbi'

// USDC amount used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
// const usdcCurrencyAmount = CurrencyAmount.fromRawAmount(USDC[ChainId.MAINNET], 100_000e6)
// @TODO: change back, but to bootstrap we dont have enought liquidity
const usdcCurrencyAmount = {
  [ChainId.MAINNET]: CurrencyAmount.fromRawAmount(USDC[ChainId.MAINNET], 100e6),
  [ChainId.TESTNET]: CurrencyAmount.fromRawAmount(USDC[ChainId.TESTNET], 100e18),
}
/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price<Currency, Token> | undefined {
  const { chainId } = useActiveWeb3React()
  const _usdcCurrencyAmount = usdcCurrencyAmount[chainId ?? ChainId.MAINNET]

  const v2USDCTrade = useV2TradeExactOut(
    currency, _usdcCurrencyAmount,
      {
      maxHops: 2,
      }
  )

  return useMemo(() => {
    if (!currency || !chainId) {
      return undefined
    }

    if (currency && _usdcCurrencyAmount.currency.equals(currency)) {
      return new Price(currency, USDC[chainId], JSBI.BigInt(1), JSBI.BigInt(1))
    }

    // return some fake price data for non-mainnet
    if (chainId === undefined) {
      return new Price(
        currency,
        USDC[ChainId.TESTNET],
        10 ** Math.max(0, currency.decimals - 6),
        15 * 10 ** Math.max(6 - currency.decimals, 0)
      )
    }

    // use v2 price if available, v3 as fallback
    if (v2USDCTrade) {
      const { numerator, denominator } = v2USDCTrade.route.midPrice
      const adjustmentFactor = _usdcCurrencyAmount.currency.equals(currency) ? JSBI.BigInt(10**12) : JSBI.BigInt(1)
      return new Price(currency, USDC[chainId], JSBI.multiply(denominator, adjustmentFactor), numerator)
    }

    return undefined
  }, [chainId, currency, v2USDCTrade])
}

export function useUSDCValue(currencyAmount: CurrencyAmount<Currency> | undefined | null) {
  const price = useUSDCPrice(currencyAmount?.currency)

  return useMemo(() => {
    if (!price || !currencyAmount) return null
    try {
      return price.quote(currencyAmount)
    } catch (error) {
      return null
    }
  }, [currencyAmount, price])
}
