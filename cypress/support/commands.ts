declare namespace Cypress {
  interface Chainable<Subject = any> {
    interceptRefreshTokensRequest(): void;
    login(email: string, password: string): void;
    getProjects(): void;
    getListView(): void;
    getTasks(): void;
    getTags(): void;

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

function getProjects() {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  cy.intercept(
    {
      method: 'GET',
      url: `${apiBaseUrl}/projects`,
    },
    {
      fixture: 'projects.json',
    }
  ).as('getProjects');
}

function getTags() {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  cy.intercept(
    {
      method: 'GET',
      url: `${apiBaseUrl}/tags`,
    },
    {
      fixture: 'tags.json',
    }
  ).as('getTags');
}

function getListView() {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  cy.intercept(
    {
      method: 'GET',
      url: `${apiBaseUrl}/projects/1`,
    },
    {
      fixture: 'list-view.json',
    }
  ).as('getListView');
}

function getTasks() {
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  cy.intercept(
    {
      method: 'GET',
      url: `${apiBaseUrl}/tasks`,
    },
    {
      fixture: 'tasks.json',
    }
  ).as('getTasks');
}

function interceptRefreshTokensRequest() {
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

Cypress.Commands.add(
  'interceptRefreshTokensRequest',
  interceptRefreshTokensRequest
);
Cypress.Commands.add('login', login);
Cypress.Commands.add('getBySel', getBySel);
Cypress.Commands.add('getBySelLike', getBySelLike);
Cypress.Commands.add('getProjects', getProjects);
Cypress.Commands.add('getTags', getTags);
Cypress.Commands.add('getTasks', getTasks);
Cypress.Commands.add('getListView', getListView);

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
