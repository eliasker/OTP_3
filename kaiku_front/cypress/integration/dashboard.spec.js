describe('Basic functionality', function() {

  beforeEach(function() {
    cy.visit('/dashboard')
  })

  it('front page can be opened', function() {
    cy.contains('Kirjaudu')
  })

  it('login form works', function() {
    cy.get('#inputUsername').type('123')
    cy.get('#inputPassword').type('123{enter}')
    cy.get('#inputPassword').type('123{enter}')
    cy.contains('Kojelauta')
  })

  describe('When user logged in', function() {
    beforeEach(function() {
      cy.get('#inputUsername').type('123')
      cy.get('#inputPassword').type('123{enter}')
      cy.get('#inputPassword').type('123{enter}')
    })

    it('check initial content', function() {
      cy.contains('Käyttäjähallinta')
      cy.contains('#id')
      cy.contains('Keskustelut')
    })

    it('check side menu', function() {
      cy.get('.sidebar-sticky .nav-link').should('have.length', 4)

      cy.get('.sidebar-sticky .nav-link').first().click()
      cy.contains('Käyttäjänimi')

      cy.get('.sidebar-sticky ul:first li').last().click()
      cy.contains('Toista salasana')

      cy.get('.sidebar-sticky ul:last li').first().click()
      cy.contains('Käyttäjiä')

      cy.get('.sidebar-sticky .nav-link').last().click()
      cy.contains('Lisätyt henkilöt')
    })

    it('check top nav', function() {
      cy.get('.btn-toolbar .btn').should('have.length', 2)

      cy.get('.btn-toolbar .btn:first').click()
      cy.contains('Toista salasana')

      cy.get('.btn-toolbar .btn:last').click()
      cy.contains('Ryhmän nimi')

      cy.get('.fixed-top .nav-link').click()
      cy.contains('vastaus3')
    })

    it('check kaikki käyttäjät', function() {
      cy.get('.btn-outline-primary:first').click()
      cy.contains('Tallenna')
    })

    it('check kaikki ryhmät', function() {
      cy.get('.sidebar-sticky ul:last li').first().click()
      cy.get('.btn-outline-primary:first').click()
      cy.contains('Ryhmän muokkaus')
    })
  })
})