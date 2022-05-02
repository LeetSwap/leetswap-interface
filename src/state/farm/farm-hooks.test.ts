import { ChainId } from 'constants/chains'
import { DIFFUSION } from 'constants/tokens'
import JSBI from 'jsbi'
import { CurrencyAmount } from 'sdk-core/entities'
import { useCalculateAPR } from './farm-hooks'

describe('Farm Hooks', () => {
  it('Calculate APR with rough estimates', () => {
    // e.g. we are emitting 200k Diff a week = 200k 200k * 10 ** 18
    const poolEmissionPerSecondNumber = JSBI.divide(JSBI.BigInt(200_000 * 10 ** 18), JSBI.BigInt(7 * 24 * 60 * 60))
    console.log(poolEmissionPerSecondNumber.toString())
    const poolEmissionPerSecondAmount = CurrencyAmount.fromRawAmount(
      DIFFUSION[ChainId.MAINNET],
      poolEmissionPerSecondNumber
    )
  })
})
