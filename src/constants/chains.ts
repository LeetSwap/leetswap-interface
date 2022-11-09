export enum ChainId {
  MAINNET = 7700,
  TESTNET = 740,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  // [ChainId.MAINNET]: `https://evmos-rpc2.binary.host`,
  [ChainId.MAINNET]: `https://eth.bd.evmos.org:8545`,
  [ChainId.TESTNET]: `https://eth.bd.evmos.dev:8545`,
  // From Metamask
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}
