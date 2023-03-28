import { CONTRACTS } from './contracts'

describe('Add Liquidity', () => {
  it('Loads Eth correctly', () => {
    cy.visit(`/add/v2/ETH`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'ETH')
  })

  it('loads the two correct tokens', () => {
    const { METH, MUSDC } = CONTRACTS
    cy.visit(`/add/v2/${MUSDC}/${METH}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MUSDC')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'METH')
  })

  it('does not crash if ETHis duplicated', () => {
    const { METH } = CONTRACTS
    cy.visit(`/add/v2/${METH}/${METH}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'METH')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('not.contain.text', 'METH')
  })

  it.skip('token not in storage is loaded', () => {
    cy.visit('/add/v2/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'SKL')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'MKR')
  })

  it('single token can be selected', () => {
    const { METH, MUSDC } = CONTRACTS
    cy.visit(`/add/v2/${METH}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'METH')
    cy.visit(`/add/v2/${MUSDC}`)
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MUSDC')
  })
})
