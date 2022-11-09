import { ChainId } from 'constants/chains'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { MAINNET, TESTNET } from './periphery'

// Actively Deployed by us

export const V2_FACTORY_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.factory,
  [ChainId.TESTNET]: TESTNET.factory,
}
export const MULTICALL2_ADDRESSES = {
  [ChainId.MAINNET]: MAINNET.multicall2,
  [ChainId.TESTNET]: TESTNET.multicall2,
}

export const V2_ROUTER_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.router,
  [ChainId.TESTNET]: TESTNET.router,
}

export const MINICHEF_V2_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.minichef,
  [ChainId.TESTNET]: TESTNET.miniChef,
}

export const AIRDROP_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.airdrop,
  [ChainId.TESTNET]: TESTNET.airdrop,
}

export const DIFFUSION_BAR_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.diffusionbar,
  [ChainId.TESTNET]: TESTNET.diffusionbar,
}

// Used but ultimately not ours
export const WETH9_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.weth9,
  [ChainId.TESTNET]: TESTNET.weth9,
}

export const STABLE_PAIR_ADDRESSES = {
  [ChainId.MAINNET]: MAINNET.stablePairs,
  [ChainId.TESTNET]: TESTNET.stablePairs,
}

/**
 * ------------------------------------------------------------------------------------
 * Not sure if these are used in the diffusion codebase
 * @TODO: cleanup
 */

export const GOVERNANCE_ADDRESS = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
export const TIMELOCK_ADDRESS = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES = constructSameAddressMap('@TODO:CHANGEME1234567890')
export const QUOTER_ADDRESSES = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6')
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
)
export const ENS_REGISTRAR_ADDRESSES = {
  [ChainId.MAINNET]: '0xae9Da235A2276CAa3f6484ad8F0EFbF4e0d45246',
  [ChainId.TESTNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES = {
  [ChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564')
export const V3_MIGRATOR_ADDRESSES = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34')
