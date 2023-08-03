import React from 'react'
import { InfoCard } from 'components/InfoCard'


//TODO: Adopt this in case we need it in the future
export function NomadWarningBanner({ style }: { style?: any }) {
  return (
    <InfoCard
      style={style}
      title="WARNING: OUR DEX IS COMPROMISED"
      description={
        <ol>
          <li>
            The LeetSwap contracts were exploited. All of the pools are unsafe and liquidity can be stolen.
          </li>
          <li>
            If you have still some tokens you can try to sell them for ETH and salvage what you can.
          </li>
          <li>
            DO NOT BUY ANY TOKEN OR YOU WILL LOSE YOUR FUNDS.
          </li>
        </ol>
      }
    />
  )
}
