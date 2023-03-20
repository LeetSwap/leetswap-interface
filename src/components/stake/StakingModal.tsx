import React, { useState, useCallback } from 'react'
// import { V2_ROUTER_ADDRESS } from '../../constants/addresses'
// import { useV2LiquidityTokenPermit } from '../../hooks/useERC20Permit'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components/macro'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonConfirmed, ButtonError, ButtonSecondary } from '../Button'
import ProgressCircles from '../ProgressSteps'
import CurrencyInputPanel from '../CurrencyInputPanel'

import { CurrencyAmount, Token } from 'sdk-core'
import { useActiveWeb3React } from '../../hooks/web3'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { useDiffusionBar } from '../../hooks/useContract'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useDerivedStakeInfo } from '../../state/stake/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../ModalViews'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import Confetti from 'react-confetti'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  availableAmount?: CurrencyAmount<Token>
  currencyToAdd?: Token
}

const ConfettiZ = styled(Confetti)`
  z-index: 5;
`

export default function StakingModal({ isOpen, onDismiss, availableAmount, currencyToAdd }: StakingModalProps) {
  const { library, account } = useActiveWeb3React()

  const { addToken, success: success } = useAddTokenToMetamask(currencyToAdd)

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedStakeInfo(typedValue, availableAmount?.currency, availableAmount)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }, [onDismiss])

  // approval data for stake
  const deadline = useTransactionDeadline()

  const diffusionBar = useDiffusionBar()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, diffusionBar?.address)

  async function onStake() {
    setAttempting(true)

    if (diffusionBar && parsedAmount && deadline && account) {
      if (approval === ApprovalState.APPROVED) {
        try {
          const response = await diffusionBar.enter(`0x${parsedAmount.quotient.toString(16)}`)
          addTransaction(response, {
            summary: 'Stake LEET',
          })
          setHash(response.hash)
        } catch (e: any) {
          console.error(e)
          setAttempting(false)
        }
      } else {
        setAttempting(false)
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(availableAmount)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if (!library || !deadline) throw new Error('missing dependencies')
    if (!parsedAmount) throw new Error('missing liquidity amount')

    await approveCallback()
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Stake</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <CurrencyInputPanel
            value={typedValue}
            onUserInput={onUserInput}
            onMax={handleMax}
            showMaxButton={!atMaxAmount}
            currency={availableAmount?.currency}
            label={''}
            customBalanceText={'Available to stake: '}
            id="stake-diffusion-token"
          />

          <RowBetween>
            <ButtonConfirmed
              mr="0.5rem"
              onClick={onAttemptToApprove}
              confirmed={approval === ApprovalState.APPROVED}
              disabled={approval !== ApprovalState.NOT_APPROVED}
            >
              Approve
            </ButtonConfirmed>
            <ButtonError
              disabled={!!error || approval !== ApprovalState.APPROVED}
              error={!!error && !!parsedAmount}
              onClick={onStake}
            >
              {error ?? 'Deposit'}
            </ButtonError>
          </RowBetween>
          <ProgressCircles steps={[approval === ApprovalState.APPROVED]} disabled={true} />
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Staking</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{parsedAmount?.toSignificant(4)} LEET</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {attempting && hash && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <ConfettiZ
            colors={['#22c55e', '#16a34a', '#15803d', '#166534', '#14532da', '#14532d']}
            recycle={false}
            width={1920}
            height={1480}
            numberOfPieces={200}
            drawShape={(ctx) => {
              ctx.beginPath()
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i
                const x = (0.2 + 1.5 * angle) * Math.cos(angle)
                const y = (0.2 + 1.5 * angle) * Math.sin(angle)
                ctx.lineTo(x, y)
              }
              ctx.stroke()
              ctx.closePath()
            }}
          />
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Staked {parsedAmount?.toSignificant(4)} LEET</TYPE.body>
            <AddXDiffButton addToken={addToken} success={success} />
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}

function AddXDiffButton({ addToken, success }: { addToken: () => void; success?: boolean }) {
  if (success) {
    return <ButtonSecondary disabled>Added to Metamask</ButtonSecondary>
  }
  return <ButtonSecondary onClick={addToken}>Add xLEET to Metamask</ButtonSecondary>
}
