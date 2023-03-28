import { Eth } from './tokens'

describe('Ether', () => {
  it('static constructor uses cache', () => {
    expect(Eth.onChain(1) === Eth.onChain(1)).toEqual(true)
  })
  it('caches once per chain ID', () => {
    expect(Eth.onChain(1) !== Eth.onChain(2)).toEqual(true)
  })
  it('#equals returns false for diff chains', () => {
    expect(Eth.onChain(1).equals(Eth.onChain(2))).toEqual(false)
  })
  it('#equals returns true for same chains', () => {
    expect(Eth.onChain(1).equals(Eth.onChain(1))).toEqual(true)
  })
})
