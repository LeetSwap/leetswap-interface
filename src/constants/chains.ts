export enum ChainId {
  MAINNET = 59144,
  TESTNET = 1442,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://rpc.linea.build`,
  [ChainId.TESTNET]: `https://rpc.ankr.com/polygon_zkevm_testnet`,
}
