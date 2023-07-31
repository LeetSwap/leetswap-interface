export enum ChainId {
  MAINNET = 8453,
  TESTNET = 59140,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://mainnet.base.org`,
  [ChainId.TESTNET]: `https://rpc.goerli.linea.build`,
}
