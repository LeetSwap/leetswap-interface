import React, { useState } from 'react'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components/macro'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonError } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useMiniChef, usePairContract } from '../../hooks/useContract'
import { SubmittedView, LoadingView } from '../ModalViews'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useActiveWeb3React } from '../../hooks/web3'
import { LPFeesInfo } from 'state/fees/hooks'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface ClaimFeesModalProps {
  isOpen: boolean
  onDismiss: () => void
  lpFeesInfo: LPFeesInfo
}

export default function ClaimFeesModal({ isOpen, onDismiss, lpFeesInfo }: ClaimFeesModalProps) {
  const { account } = useActiveWeb3React()

  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)

  function wrappedOnDismiss() {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }

  const pair = usePairContract(lpFeesInfo.pairAddress, true)

  async function onClaimFees() {
    if (pair && account) {
      setAttempting(true)

      await pair
        .claimFees()
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Claim accumulated fees`,
          })
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          console.log(error)
        })
    }
  }

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Claim</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          {lpFeesInfo.claimable0.greaterThan(0) && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {lpFeesInfo.claimable0.toSignificant(6)}
              </TYPE.body>
              <TYPE.body>Unclaimed {lpFeesInfo.tokens[0].symbol}</TYPE.body>
            </AutoColumn>
          )}
          {lpFeesInfo.claimable1.greaterThan(0) && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {lpFeesInfo.claimable1.toSignificant(6)}
              </TYPE.body>
              <TYPE.body>Unclaimed {lpFeesInfo.tokens[1].symbol}</TYPE.body>
            </AutoColumn>
          )}
          <ButtonError disabled={!!error} error={!!error} onClick={onClaimFees}>
            {error ?? 'Claim Fees'}
          </ButtonError>
        </ContentWrapper>
      )}

      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>Claiming fees</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}

      {hash && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Claimed fees!</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
