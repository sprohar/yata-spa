// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
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

function login(email: string, password: string): void {
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
