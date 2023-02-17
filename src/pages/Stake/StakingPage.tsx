import { AutoColumn } from 'components/Column'
import { InfoCard } from 'components/InfoCard'

import styled from 'styled-components'

import React from 'react'

import { PotionIcon } from '../../components/Potions/Potions'
import { TYPE } from '../../theme'

import TuxImg from '../../assets/images/tux2.png'

import { StakingBalance } from 'components/stake/StakingBalance'

const Tux = styled.img`
  position: absolute;
  height: 250px;
  margin-top: 45%;
  margin-left: 50%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none
  `};
  z-index: -1;
`

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
  margin-top: -5%;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 2%;
`

// const APYRow = styled(RowBetween)`
//   background: ${({ theme }) =>
//     `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
//   border: 1px solid rgba(66, 26, 4, 0.7);
//   box-shadow: 0 0 5px rgba(245, 158, 11, 0.1), 0 0 7px rgba(245, 158, 11, 0.3);
//   border-radius: 8px;
//   padding: 2% 5%;
//   width: 50%;
//   font-size: 22px;
// `

export function StakingPage() {
  return (
    <>
      <PageWrapper>
        {/* <Tux src={TuxImg} /> */}
        <Heading>
          {/* <PotionIcon width={60} height={60} /> */}
          <TYPE.largeHeader style={{ margin: 0 }}>Earn rewards by staking LEET for xLEET</TYPE.largeHeader>
        </Heading>
        <AutoColumn gap="lg" justify="center">
          <InfoCard
            title="Staking rewards"
            description={`The sell tax on our token is distributed as LEET proportional to your share of the staking pool. When your LEET is staked you receive xLEET.

          ${`\n`} Your xLEET is continuously compounding, when you unstake you will receive all the originally deposited LEET plus any additional tokens accrued from fees.

          ${`\n`} NOTE: The APR shown is based on the fees generated in the last 24 hours and may vary over time.`}
          />
          <StakingBalance />
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
