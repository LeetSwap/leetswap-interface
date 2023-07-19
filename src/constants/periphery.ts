/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0x7cc74075d60C059468e267bef5D454D032565325',
  weth9: '0x10B7DE073b514f54E27B71cd267CcE4379bbfac9',
  router: '0x415B6ccd96f08c678221cEf2813cc29849586CBa',
  mockUSDC: '0xcE87E0960f4e2702f4bFFE277655E993Ae720e84',
  multicall2: '0x4DDf0fa98B5f9Bd7Cb0645c25bA89A574fe9Be8c',
  miniChef: '0x77a656dF2f322A2Fa7c2Ea7B9EC6094a2e7FFF98',
  diffusion: '0xd9FB44a4bbFebC87765d2A2eD0F75504DF5986C3',
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
  diffusionbar: '0x601a804f0B9Da72d0c7FC9f952355Be4e6c24776',
}
