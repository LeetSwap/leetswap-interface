import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'

import StakingModal from './StakingModal'
import UnstakingModal from './UnstakingModal'
import styled from 'styled-components'

import { DIFFUSION, XDIFFUSION } from 'constants/tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useTokenBalance } from 'state/wallet/hooks'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { CurrencyLogoFromList } from '../../components/CurrencyLogo/CurrencyLogoFromList'
import { HRDark } from '../../components/HR/HR'

import { useEarnedDiff } from 'components/stake/stake-hooks'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { CurrencyAmount } from 'sdk-core/entities'

export function StakingBalance() {
  const { account, chainId } = useActiveWeb3React()
  const token = chainId ? DIFFUSION[chainId] : undefined
  const xToken = chainId ? XDIFFUSION[chainId] : undefined
  const diffusionBalance = useTokenBalance(account ?? undefined, token)
  const xdiffBalance = useTokenBalance(account ?? undefined, xToken)
  const earnedDiff = useEarnedDiff(xdiffBalance)

  const ratio = useEarnedDiff(xToken ? CurrencyAmount.fromRawAmount(xToken, 10 ** xToken.decimals) : undefined)
  // const apy = useStakingAPY()

  const [stakingModalOpen, setStakingModalOpen] = useState(false)
  const [unstakeModalOpen, setUnstakeModalOpen] = useState(false)
  return (
    <>
      {/*<APYRow>*/}
      {/*  <AutoColumn justify={'start'}>Staking APY</AutoColumn>*/}
      {/*  <AutoColumn justify={`end`}>18.5%</AutoColumn>*/}
      {/*</APYRow>*/}

      <BalanceRow>
        <BalanceColumn justify={`stretch`}>
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TYPE.largeHeader color={'primary1'} marginBottom={`15px`}>
                Ratio
              </TYPE.largeHeader>
            </AutoColumn>
          </RowBetween>
          <HRDark />
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <DoubleCurrencyLogo currency0={xToken} currency1={token} size={24} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  DIFF / xDIFF
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>
            <AutoColumn justify={'end'}>{ratio?.toSignificant()}</AutoColumn>
          </RowBetween>
        </BalanceColumn>
      </BalanceRow>

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
          <RowBetween>
            <AutoColumn justify={'start'}>
              <TokenLogo>
                <CurrencyLogoFromList currency={token ?? undefined} size={'24px'} />
                <TYPE.body fontSize={20} fontWeight={500} margin={'10px'}>
                  Staked DIFF
                </TYPE.body>
              </TokenLogo>
            </AutoColumn>

            <AutoColumn justify={'end'}>{earnedDiff?.toSignificant()}</AutoColumn>
          </RowBetween>
        </BalanceColumn>
      </BalanceRow>

      <ButtonRow justify={'space-between'}>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!diffusionBalance?.greaterThan('0')}
            onClick={() => setStakingModalOpen(true)}
          >
            Stake
          </ButtonPrimary>
        </AutoColumn>
        <AutoColumn justify={'stretch'}>
          <ButtonPrimary
            padding="8px"
            borderRadius="8px"
            width="140px"
            disabled={!xdiffBalance?.greaterThan('0')}
            onClick={() => setUnstakeModalOpen(true)}
          >
            Unstake
          </ButtonPrimary>
        </AutoColumn>
      </ButtonRow>

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
    </>
  )
}

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
