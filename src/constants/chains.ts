export enum ChainId {
  MAINNET = 1101,
  TESTNET = 1442,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://zkevm-rpc.com`,
  [ChainId.TESTNET]: `https://rpc.ankr.com/polygon_zkevm_testnet`,
}
