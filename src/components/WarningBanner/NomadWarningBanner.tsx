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
            If you have still some tokens  you can try to sell them for ETH and salvage what you can.
          </li>
          <li>
          We will be back with a new version of the DEX. We were able to rescue some of the liquidity from the pools, check our socials for more info.
          </li>
          <li>
           <b>DO NOT ADD LIQUIDITY TO ANY POOL OR YOU WILL LOSE YOUR FUNDS.</b>
          </li>
          <li>
            <b>DO NOT BUY ANY TOKEN OR YOU WILL LOSE YOUR FUNDS.</b>
          </li>
        </ol>
      }
    />
  )
}
