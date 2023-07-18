export enum ChainId {
  MAINNET = 59144,
  TESTNET = 1442,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://linea-mainnet.infura.io/v3/ab731bdff08a4a92a7d7176d7ffee512`,
  [ChainId.TESTNET]: `https://rpc.ankr.com/polygon_zkevm_testnet`,
}
