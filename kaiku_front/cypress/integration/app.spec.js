describe('Browser', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Kirjaudu')
  })

  it('login form works', function() {
    cy.get('#inputUsername')
      .type('123')
    cy.get('#inputPassword')
      .type('123')
    cy.get('.btn')
      .click()
    cy.contains('Hissichat')
  })

  describe('When user logged in', function() {
    beforeEach(function() {
      cy.get('#inputUsername')
        .type('123')
      cy.get('#inputPassword')
        .type('123')
      cy.get('.btn')
        .click()
      cy.contains('Hissichat')
    })

    it('display own profile works', function() {
      cy.get('.fa-ellipsis-v').click()
      cy.get('.dropdown-item').first().click()
      cy.contains('Poistu')
      cy.contains('Tallenna')
    })

    it('display own profile works', function() {
      cy.get('.fa-times').click()
      cy.contains('Poistu')
      cy.contains('Tallenna')
    })
  })
})