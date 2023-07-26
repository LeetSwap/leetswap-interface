/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0x10B7DE073b514f54E27B71cd267CcE4379bbfac9',
  weth9: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
  router: '0xcE87E0960f4e2702f4bFFE277655E993Ae720e84',
  mockUSDC: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
  multicall2: '0xfCD3842f85ed87ba2889b4D35893403796e67FF1',
  miniChef: '0xe4d0165EB7C1aFDB6337468F220D944418F58b96',
  diffusion: '0x554f16d513e1eB2fDf3b8CaAAb50405415Fa405A',
}

const MAINNET_PERIPHERY = {
  factory: '0x4DDf0fa98B5f9Bd7Cb0645c25bA89A574fe9Be8c',
  weth9: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
  router: '0x169C06b4cfB09bFD73A81e6f2Bb1eB514D75bB19',
  multicall2: '0xfCD3842f85ed87ba2889b4D35893403796e67FF1',
  //
  minichef: '0x3A5E791405526EFaDf1432Bac8d114B77Da3628c',
  diffusion: '0x0963a1aBAF36Ca88C21032b82e479353126A1C4b',
}

const TESTNET_STABLE_PAIRS: string[] = []

const MAINNET_STABLE_PAIRS: string[] = []

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  stablePairs: MAINNET_STABLE_PAIRS,
  diffusionbar: '0xdf0D02351A3e7A21D3936cf1CFd1ee554Cee0a80',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  stablePairs: TESTNET_STABLE_PAIRS,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0xe4d0165EB7C1aFDB6337468F220D944418F58b96', // true one is '0x3A5E791405526EFaDf1432Bac8d114B77Da3628c',
}
