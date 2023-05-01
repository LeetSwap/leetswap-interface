/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0x4DDf0fa98B5f9Bd7Cb0645c25bA89A574fe9Be8c',
  cantodexFactory: '0x760a17e00173339907505B38F95755d28810570C',
  weth9: '0x04a72466De69109889Db059Cb1A4460Ca0648d9D',
  router: '0x169C06b4cfB09bFD73A81e6f2Bb1eB514D75bB19',
  mockUSDC: '0xc51534568489f47949A828C8e3BF68463bdF3566',
  mockCANTO: '0xf1361Dc7DFB724bd29FE7ade0CdF9785F2Bc20E6',
  mockATOM: '0x9832169B33DC5777D3d28572f35E0a537Ff7A04C',
  mockOSMOSIS: '0x1dccd8025688e39C72f2539C6f00d77bd6678425',
  multicall2: '0x0e356B86FA2aE1bEB93174C18AD373207a40F2A3',
  LHS: '0x7c21d6A51d6f591A95470f1F262C9c804c4CEAc3',
  RHS: '0xD3607915d934576EcdC389E7DBc641097fd5A0dE',
  testerAddress: '0x1662BfeA0Af3515baf9DAb3f0961Dc26DD35202B',
  //0x851e5cE9fa409B731f980a5E00FA889b58D9037D
  // 0xA2c659531B15bFf2556Ea7E12D477D3C8761ACD9
  //0x95BF964f113a75a3974E8164105e6e5A8D743b87
  // 0x62154D72C202f04CA50a3Ba5630052D0348f337A
  rewardToken: '0x7e806D59528F6Fa7CCcAdb4821Dd42551113DEFc',
  secondaryRewardToken: '0x9AC19677BD6B1a3ba046C33f4D2f1952cA0e9a13',
  miniChef: '0x0fCee557E3eB94913e202eF91314f14298591a61',
  complexRewarderTime: '0x2916d2e0B675e6993250f2DB9764Cd7fD5379C04',
  diffusion: '',
}

const MAINNET_PERIPHERY = {
  factory: '0x116e8a41E8B0A5A87058AF110C0Ddd55a0ed82B7',
  cantodexFactory: '0xE387067f12561e579C5f7d4294f51867E0c1cFba',
  weth9: '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B',
  router: '0x4bc8090e870301Dc80A2DBec600820BEeb5923A9',
  multicall2: '0xfCD3842f85ed87ba2889b4D35893403796e67FF1',
  //
  minichef: '0xC4DC314E4370085cFB08bd106fefb44A512fae66',
  diffusion: '0x9aeff862435Cc243D12CEe915e7129629c6a8D5D',
}

const TESTNET_STABLE_PAIRS: string[] = [
  '0x252631e22e1ECc2fc0E811562605ed624B7E31d5', // NOTE/USDT
  '0x2db30A39Ec88247da8906506DB8E9dd933A5C775', // NOTE/USDC
]

const MAINNET_STABLE_PAIRS: string[] = [
  '0x35DB1f3a6A6F07f82C76fCC415dB6cFB1a7df833', // NOTE/USDT
  '0x9571997a66D63958e1B3De9647C22bD6b9e7228c', // NOTE/USDC
  '0x3CE59FaB4b43B2709343Ba29c768E222e080e2a4', // USDT/USDC
]

const wcanto_testnet = '0x04a72466De69109889Db059Cb1A4460Ca0648d9D'
const note_testnet = '0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f'
const usdc_testnet = '0xc51534568489f47949A828C8e3BF68463bdF3566'
const eth_testnet = '0xCa03230E7FB13456326a234443aAd111AC96410A'
const atom_testnet = '0x40E41DC5845619E7Ba73957449b31DFbfB9678b2'
const usdt_testnet = '0x4fC30060226c45D8948718C95a78dFB237e88b40'

const TESTNET_CANTODEX_TOKEN_PAIRS: string[] = [
    [wcanto_testnet, note_testnet].sort().join('-'),
    [wcanto_testnet, atom_testnet].sort().join('-'),
    [wcanto_testnet, eth_testnet].sort().join('-'),
    [note_testnet, usdc_testnet].sort().join('-'),
    [note_testnet, usdt_testnet].sort().join('-'),
]

const wcanto = '0x826551890Dc65655a0Aceca109aB11AbDbD7a07B'
const note = '0x4e71A2E537B7f9D9413D3991D37958c0b5e1e503'
const usdc = '0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd'
const eth = '0x5FD55A1B9FC24967C4dB09C513C3BA0DFa7FF687'
const atom = '0xecEEEfCEE421D8062EF8d6b4D814efe4dc898265'
const usdt = '0xd567B3d7B8FE3C79a1AD8dA978812cfC4Fa05e75'
const bank = '0x6f6BAe4110eCC33fE4E330b16b8df2A5E9807658'
const topg = '0xe350b49e52c9d865735BFD77c956f64585Be7583'

const MAINNET_CANTODEX_TOKEN_PAIRS: string[] = [
  [bank, wcanto].sort().join('-'),
  [topg, wcanto].sort().join('-'),
  [note, usdc].sort().join('-'),
  [note, usdt].sort().join('-'),
  [wcanto, note].sort().join('-'),
  [eth, wcanto].sort().join('-'),
  [atom, wcanto].sort().join('-'),
]

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  stablePairs: MAINNET_STABLE_PAIRS,
  cantodexTokenPairs: MAINNET_CANTODEX_TOKEN_PAIRS,
  diffusionbar: '0x32c89133c2702cBde22261D09372C5Bb7815C6CA',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  stablePairs: TESTNET_STABLE_PAIRS,
  cantodexTokenPairs: TESTNET_CANTODEX_TOKEN_PAIRS,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x2314D451a1A2519501119f105dd1D65D0CE4E93b',
}
