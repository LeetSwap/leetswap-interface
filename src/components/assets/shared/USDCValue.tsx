import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import React from 'react'

export const USDCValue = ({ amount }: { amount: CurrencyAmount<Currency> }) => {
  return (
    <span style={{ color: '#22c55e', fontSize: '14px', paddingLeft: '5px' }}>
      <span>$</span>
      {amount ? <span>{amount.toFixed(2, { groupSeparator: ',' })}</span> : `     `}
    </span>
  )
}
