import { ChainId } from 'constants/chains'
import JSBI from 'jsbi'

export const INIT_CODE_HASH = '0x15f9c89ab96775224e24e783291f3cd4fc0d8b86f5980825c24231dad4bffd04'
export const CANTODEX_INIT_CODE_HASH = {
    [ChainId.MAINNET]:'0x97653931c50be3c0550346c96798d2d21ba0ebddcbc1a6debaa0669b70bb5735',
    [ChainId.TESTNET]:'0x0f5760a5912a23a98d06488c5a4fe8726ac43ca74c0928b5089f1af11038d920'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
