describe('Auth', () => {
  describe('Sign In', () => {
    it('Signs in', () => {
      cy.visit('/auth/sign-in');
      cy.get('#email').type('testuser@yata.app');
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/app');
    });

    it('Signs in with wrong password', () => {
      cy.visit('/auth/sign-in');
      cy.get('#email').type('testuser@yata.app');
      cy.get('#password').type('wrong-password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/auth/sign-in');
      cy.get('.error').should('contain', 'Invalid credentials');
    });

    it('Signs in with wrong email', () => {
      cy.visit('/auth/sign-in');
      cy.get('#email').type('invalid-email@example.com');
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/auth/sign-in');
      cy.get('.error').should('contain', 'Invalid credentials');
    });
  });

  describe('Sign Up', () => {
    it('Signs up', () => {
      cy.visit('/auth/sign-up');

      const randomHexString = (Math.random() + 1).toString(16).substring(2);
      cy.get('#email').type(`${randomHexString}@yata.app`);
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/app');
    });

    it('Signs up with existing email', () => {
      cy.visit('/auth/sign-up');
      cy.get('#email').type('testuser@yata.app');
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
      cy.location('pathname').should('eq', '/auth/sign-up');
      cy.get('.error').should('contain', 'Email already exists');
    });
  });
});
