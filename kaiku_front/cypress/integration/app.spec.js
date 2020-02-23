describe('Basic functionality', function() {

  beforeEach(function() {
    cy.visit('/')
  })

  it('front page can be opened', function() {
    cy.contains('Kirjaudu')
  })

  it('login form works', function() {
    cy.get('#inputUsername').type('123')
    cy.get('#inputPassword').type('123')
    cy.get('.btn').click()
    cy.contains('Hissichat')
  })

  describe('When user logged in', function() {
    beforeEach(function() {
      cy.get('#inputUsername')
        .type('123')
      cy.get('#inputPassword')
        .type('123{enter}')
    })

    it('check initial content', function() {
      cy.contains('Käyttäjiä paikalla - 6')
      cy.contains('vastaus3')
      cy.contains('Hissichat 6/6')
    })

    it('display own profile works', function() {
      cy.get('.fa-ellipsis-v').click()
      cy.get('.dropdown-item').first().click()
      cy.contains('Poistu')
      cy.contains('Tallenna')
    })

    it('display own profike alternatively', function() {
      cy.get('.dark').first().click()
      cy.contains('Poistu')
      cy.contains('Tallenna')
    })

    it('display others profile', function() {
      cy.get('.group-chat').last().click()
      cy.get('.profile').last().click()
      cy.get('.fa-user').last().click()
      cy.contains('Poistu')
    })

    it('check profile then type message', function() {
      cy.get('.fa-ellipsis-v').click()
      cy.get('.dropdown-item').first().click()
      cy.contains('Poistu')
      cy.get('.fa-times').click()
      cy.get('.message-from-group').type('123 check check')
      cy.get('.send-btn').click()
      cy.get('.out-message').last().contains('123 check check')
    })

    it('check display private chat list', function() {
      cy.get('.fa-user-friends').click()
      cy.get('.profile').last().contains('It is a long established fact that')
    })

    it('check search messages', function() {
      cy.get('#search-message').click()
      cy.focused().type('vastaus')
      cy.get('.in-container').should('have.length', 4)
    })

    it('check search users', function() {
      cy.get('.fa-user-friends').click()
      cy.get(".profile").should('have.length', 6)
      cy.get('.find-user-input').click().type('Mirka')
      cy.get(".profile").should('have.length', 1)
    })

    it('check message sending', function() {
      const sentMessages = 2
      cy.get('.message-from-group').type('123 check check')
      cy.get('.send-btn').click()
      cy.get('.read-field .out-container').should('have.length', sentMessages)
    })

    it('check log out', function() {
      cy.get('.fa-ellipsis-v').click()
      cy.get('.fa-door-open').click()
      cy.contains('Kirjaudu')
    })
  })
})