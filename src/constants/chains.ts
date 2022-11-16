export enum ChainId {
  MAINNET = 7700,
  TESTNET = 740,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  // [ChainId.MAINNET]: `https://canto.evm.chandrastation.com`,
  [ChainId.MAINNET]: `https://canto.slingshot.finance`,
  [ChainId.TESTNET]: `https://eth.plexnode.wtf`,
}
