describe('Pool', () => {
  beforeEach(() => cy.visit('/pool'))
  it('add liquidity links to /add/CANTO', () => {
    cy.get('#join-pool-button').click()
    cy.url().should('contain', '/add/v2/CANTO')
  })
})
