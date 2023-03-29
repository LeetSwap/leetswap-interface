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
  miniChef: '',
  diffusion: '',
}

const MAINNET_PERIPHERY = {
  factory: '0xcE87E0960f4e2702f4bFFE277655E993Ae720e84',
  weth9: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
  router: '0x97A0FcDF139a0040109E345cDf9d54481ff10403',
  multicall2: '0x554f16d513e1eB2fDf3b8CaAAb50405415Fa405A',
  //
  minichef: '0xC4DC314E4370085cFB08bd106fefb44A512fae66',
  diffusion: '0x9aeff862435Cc243D12CEe915e7129629c6a8D5D',
}

const TESTNET_STABLE_PAIRS: string[] = []

const MAINNET_STABLE_PAIRS: string[] = []

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  stablePairs: MAINNET_STABLE_PAIRS,
  diffusionbar: '0x32c89133c2702cBde22261D09372C5Bb7815C6CA',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  stablePairs: TESTNET_STABLE_PAIRS,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x2314D451a1A2519501119f105dd1D65D0CE4E93b',
}
