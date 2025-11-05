/// <reference types="cypress" />

describe('Sign In page', () => {
  it('should log in with proper credentials', () => {
    cy.visit('https://the-internet.herokuapp.com/login');

    cy.get('#username').should('be.visible').type('tomsmith');
    cy.get('#password').should('be.visible').type('SuperSecretPassword!');

    cy.get('button')
      .contains(/login/i)
      .should('be.visible')
      .click();

    cy.url().should('include', '/secure');

    cy.get('h2')
      .should('contain', 'Secure Area');

    cy.get('a')
      .contains(/logout/i)
      .should('be.visible')
      .click();

    cy.url().should('include', '/login');

    cy.get('#flash')
      .should('contain', 'You logged out of the secure area!');

    cy.get('#username').should('be.visible').type('dunno');
    cy.get('#password').should('be.visible').type('idunno1234');

    cy.get('button')
      .contains(/login/i)
      .should('be.visible')
      .click();

    cy.get('#flash', { timeout: 10000 }) // чекає до 10 секунд
      .should('contain', 'Your username is invalid!');
  });
});
