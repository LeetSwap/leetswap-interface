/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0xB0e83A8fC02351aAba4c9694D8d400bF0da3bD22',
  weth9: '0x10B7DE073b514f54E27B71cd267CcE4379bbfac9',
  router: '0x361cC1A7f00684EcFaE55D2539c89650519D6b19',
  mockUSDC: '0xcE87E0960f4e2702f4bFFE277655E993Ae720e84',
  multicall2: '0x4DDf0fa98B5f9Bd7Cb0645c25bA89A574fe9Be8c',
  miniChef: '',
  diffusion: '',
}

const MAINNET_PERIPHERY = {
  factory: '0x116e8a41E8B0A5A87058AF110C0Ddd55a0ed82B7',
  weth9: '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
  router: '0x4bc8090e870301Dc80A2DBec600820BEeb5923A9',
  multicall2: '0xfCD3842f85ed87ba2889b4D35893403796e67FF1',
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
