export enum ChainId {
  MAINNET = 59144,
  TESTNET = 59140,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://rpc.linea.build`,
  [ChainId.TESTNET]: `https://rpc.goerli.linea.build`,
}
