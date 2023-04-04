import { Task } from '../../src/app/models';

describe('List View', () => {
  beforeEach(() => {
    cy.getProjects();
    cy.getTags();
    cy.getTasks();
    cy.interceptRefreshTokensRequest();
    cy.login(Cypress.env('email'), Cypress.env('password'));
    cy.wait(['@getProjects', '@getTags']);

    cy.getListView();
  });

  it('should create a new task', () => {
    const newTask: Task = { id: 10, title: 'New Task', projectId: 1 };

    cy.intercept(
      {
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}/projects/1/tasks`,
      },
      {
        body: newTask,
      }
    ).as('createTask');

    cy.getBySel('sidenavProject-1').click();
    cy.wait(['@getListView']);

    cy.getBySel('createTaskInput').type(`${newTask.title}{enter}`);
    cy.wait('@createTask');
    cy.getBySel('task-' + newTask.id).should('exist');
  });
});
