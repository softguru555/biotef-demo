import * as CryptoJS from 'crypto-js';

describe('Login and Dashboard Navigation', () => {
  it('Logs in and navigates to the dashboard', () => {
    // Visit the login page
    cy.visit('/auth/login');

    // Fill in the login form
    cy.get('input[formControlName="email"]').type('www@gmail.com');
    cy.get('input[formControlName="password"]').type('123456789');

    // Submit the login form
    cy.get('button.save-button').click();
    cy.visit('/account');
    cy.wait(5000);
    cy.contains('Logout').click();
    cy.visit('/auth/login');
  });
});
