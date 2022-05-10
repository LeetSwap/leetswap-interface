import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { InfoCard } from 'components/InfoCard'
import StakingModal from 'components/stake/StakingModal'
import UnstakingModal from 'components/stake/UnstakingModal'
import styled from 'styled-components'

import { DIFFUSION, XDIFFUSION } from 'constants/tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { PotionIcon } from '../../components/Potions/Potions'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { CurrencyLogoFromList } from '../../components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from '../../components/HR/HR'
import TuxImg from '../../assets/images/tux2.png'

const Tux = styled.img`
  position: absolute;
  height: 250px;
  margin-top: 45%;
  margin-left: 47%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none
  `};
  z-index: -1;
`

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 4%;
`

// const APYRow = styled(RowBetween)`
//   background: ${({ theme }) =>
//     `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
//   border: 1px solid rgba(12, 92, 146, 0.7);
//   box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
//   border-radius: 8px;
//   padding: 2% 5%;
//   width: 50%;
//   font-size: 22px;
// `

const BalanceRow = styled(RowBetween)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent} 0%, ${theme.secondary1_30} 50%, ${theme.darkTransparent} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.3);
  border-radius: 8px;
  padding: 3% 10%;
  font-size: 22px;
`

const BalanceColumn = styled(AutoColumn)`
  width: 100%;
`

const TokenLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonRow = styled(AutoRow)`
  width: 50%;
`

export function StakingPage() {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? DIFFUSION[chainId] : undefined
  const xToken = chainId ? XDIFFUSION[chainId] : undefined
  const diffusionBalance = useTokenBalance(account ?? undefined, token)
  const xdiffBalance = useTokenBalance(account ?? undefined, xToken)

  const [stakingModalOpen, setStakingModalOpen] = useState(false)
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false)

  return (
    <>
      <PageWrapper>
        <Tux src={TuxImg} />
        <Heading>
          <PotionIcon width={60} height={60} />
          <TYPE.largeHeader style={{ margin: 0 }}>Boost your yield by staking DIFF for xDIFF</TYPE.largeHeader>
        </Heading>
        <AutoColumn gap="lg" justify="center">
          <InfoCard
            title="Staking rewards"
            description={`For every swap on the exchange, 0.05% of the 0.30% swap fees are distributed as DIFF proportional to your share of the staking pool.  Additionally, daily Diffusion holder rewards from inflation are deposited into this pool. When your DIFF is staked you receive xDIFF.

          ${`\n`} Your xDIFF is continuously compounding, when you unstake you will receive all the originally deposited DIFF and any additional from fees and daily Diffusion holders rewards`}
          />

          {/*<APYRow>*/}
          {/*  <AutoColumn justify={'start'}>Staking APY</AutoColumn>*/}
          {/*  <AutoColumn justify={`end`}>18.5%</AutoColumn>*/}
          {/*</APYRow>*/}

          <BalanceRow>
            <BalanceColumn justify={`stretch`}>
              <RowBetween>
                <AutoColumn justify={'start'}>
                  <TYPE.largeHeader color={'primary1'} marginBottom={`15px`}>
                    Your Balances
                  </TYPE.largeHeader>
                </AutoColumn>
              </RowBetween>
              <HRDark />
              <RowBetween>
                <AutoColumn justify={'start'}>
                  <TokenLogo>
                    <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
                    <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                      DIFF
                    </TYPE.body>
                  </TokenLogo>
                </AutoColumn>
                <AutoColumn justify={'end'}>{diffusionBalance?.toSignificant()}</AutoColumn>
              </RowBetween>
              <HRDark />
              <RowBetween>
                <AutoColumn justify={'start'}>
                  <TokenLogo>
                    <CurrencyLogoFromList currency={xToken ?? undefined} size={'24px'} />
                    <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                      xDIFF
                    </TYPE.body>
                  </TokenLogo>
                </AutoColumn>

                <AutoColumn justify={'end'}>{xdiffBalance?.toSignificant()}</AutoColumn>
              </RowBetween>
            </BalanceColumn>
          </BalanceRow>

          <ButtonRow justify={'space-between'}>
            <AutoColumn justify={'stretch'}>
              <ButtonPrimary padding="8px" borderRadius="8px" width="140px" onClick={() => setStakingModalOpen(true)}>
                Stake
              </ButtonPrimary>
            </AutoColumn>
            <AutoColumn justify={'stretch'}>
              <ButtonPrimary padding="8px" borderRadius="8px" width="140px" onClick={() => setUnstakeModalOpen(true)}>
                Unstake
              </ButtonPrimary>
            </AutoColumn>
          </ButtonRow>
        </AutoColumn>
        <StakingModal
          isOpen={stakingModalOpen}
          onDismiss={() => setStakingModalOpen(false)}
          availableAmount={diffusionBalance}
          currencyToAdd={xToken}
        />
        <UnstakingModal
          isOpen={unstakeModalOpen}
          onDismiss={() => setUnstakeModalOpen(false)}
          availableAmount={xdiffBalance}
        />
      </PageWrapper>
    </>
  )
}
