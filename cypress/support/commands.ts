declare namespace Cypress {
  interface Chainable<Subject = any> {
    refreshTokens(): void;
    login(email: string, password: string): void;

    getBySel(
      selector: string,
      ...args: any
    ): Cypress.Chainable<JQuery<HTMLElement>>;

    getBySelLike(
      selector: string,
      ...args: any
    ): Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

function refreshTokens() {
  cy.intercept(
    {
      method: 'POST',
      url: `${Cypress.env('authBaseUrl')}/authentication/refresh-tokens`,
    },
    {
      body: {
        accessToken: Cypress.env('accessToken'),
      },
      headers: {
        'Set-Cookie': Cypress.env('authCookie'),
      },
    }
  ).as('refreshTokens');
}

function login(email: string, password: string): void {
  cy.intercept(
    {
      method: 'POST',
      url: `${Cypress.env('authBaseUrl')}/authentication/sign-in`,
    },
    {
      body: {
        accessToken: Cypress.env('accessToken'),
        user: {
          id: 1,
          email: 'testuser@yata.app',
        },
      },
      headers: {
        'Set-Cookie': Cypress.env('authCookie'),
      },
    }
  ).as('login');

  cy.visit('/auth/sign-in');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
}

function getBySel(selector: string, ...args: any) {
  return cy.get(`[data-test=${selector}]`, ...args);
}

function getBySelLike(selector: string, ...args: any) {
  return cy.get(`[data-test*=${selector}]`, ...args);
}

Cypress.Commands.add('refreshTokens', refreshTokens);
Cypress.Commands.add('login', login);
Cypress.Commands.add('getBySel', getBySel);
Cypress.Commands.add('getBySelLike', getBySelLike);

//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
