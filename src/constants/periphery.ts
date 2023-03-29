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
  factory: '0xcE87E0960f4e2702f4bFFE277655E993Ae720e84',
  weth9: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
  router: '0xB0e83A8fC02351aAba4c9694D8d400bF0da3bD22',
  multicall2: '0x554f16d513e1eB2fDf3b8CaAAb50405415Fa405A',
  //
  minichef: '0x42D3a9DB9ea21181798b285c6F1306Fa5b194955',
  diffusion: '0xEA0B7a3256829190eA5f587509dEE953d213461c',
}

const TESTNET_STABLE_PAIRS: string[] = []

const MAINNET_STABLE_PAIRS: string[] = []

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  stablePairs: MAINNET_STABLE_PAIRS,
  diffusionbar: '0x475089fd520af9FD1Fa2CD9933d5B38C07608500',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  stablePairs: TESTNET_STABLE_PAIRS,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x601a804f0B9Da72d0c7FC9f952355Be4e6c24776',
}
