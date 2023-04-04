import { Project, Tag } from '../../src/app/models';

describe('Sidenav', () => {
  beforeEach(() => {
    const apiBaseUrl = Cypress.env('apiBaseUrl') as string;
    cy.intercept(
      {
        method: 'GET',
        url: `${apiBaseUrl}/projects`,
      },
      {
        fixture: 'projects.json',
      }
    ).as('getProjects');

    cy.intercept(
      {
        method: 'GET',
        url: `${apiBaseUrl}/tags`,
      },
      {
        fixture: 'tags.json',
      }
    ).as('getTags');

    cy.refreshTokens();
    cy.login(Cypress.env('email'), Cypress.env('password'));
    cy.wait(['@getProjects', '@getTags']);
  });

  describe('Projects', () => {
    it('should delete a project', () => {
      cy.intercept(
        {
          method: 'DELETE',
          url: `${Cypress.env('apiBaseUrl')}/projects/2`,
        },
        {
          body: { id: 2, name: 'Project 2' } as Project,
        }
      ).as('deleteProject');

      cy.getBySel('sidenavProjectOptionsButton-2').click({ force: true });
      cy.getBySel('sidenavDeleteProjectDialogButton-2').click();
      cy.getBySel('confirmationDialogConfirmButton').click();

      cy.wait('@deleteProject');
      cy.getBySel('sidenavProject-2').should('not.exist');
    });

    it('should create a project', () => {
      cy.intercept(
        {
          method: 'POST',
          url: `${Cypress.env('apiBaseUrl')}/projects`,
        },
        {
          body: { id: 1000, name: 'Project 1000' } as Project,
        }
      ).as('createProject');

      cy.getBySel('sidenavCreateProjectButton').click();
      cy.getBySel('newProjectName').type('Test Project', {
        force: true,
      });

      cy.getBySel('submit').click();

      cy.getBySel('sidenavProject-1000').should('exist');
    });

    it('should update a project', () => {
      const updatedProjectName = 'Test Project';

      cy.intercept(
        {
          method: 'PATCH',
          url: `${Cypress.env('apiBaseUrl')}/projects/1`,
        },
        {
          body: { id: 1, name: updatedProjectName } as Project,
        }
      ).as('updateProject');

      cy.getBySel('sidenavProjectOptionsButton-1').click({ force: true });
      cy.getBySel('sidenavEditProjectDialogButton-1').click();
      cy.getBySel('editProjectNameInput').clear().type(updatedProjectName);

      cy.getBySel('submitEditProjectButton').click();

      cy.getBySel('sidenavProject-1').should('contain', updatedProjectName);
    });
  });

  describe('Tags', () => {
    it('should delete a tag', () => {
      cy.intercept(
        {
          method: 'DELETE',
          url: `${Cypress.env('apiBaseUrl')}/tags/1`,
        },
        {
          body: { id: 1, name: 'Tag 1' } as Tag,
        }
      ).as('deleteTag');

      cy.getBySel('sidenavTagOptionsButton-1').click({ force: true });
      cy.getBySel('sidenavDeleteTagDialogButton-1').click();
      cy.getBySel('confirmationDialogConfirmButton').click();
      cy.getBySel('sidenavTag-1').should('not.exist');
    });

    it('should create a tag', () => {
      cy.intercept(
        {
          method: 'POST',
          url: `${Cypress.env('apiBaseUrl')}/tags`,
        },
        {
          body: { id: 1000, name: 'Tag 1000', colorHexCode: '#fff' } as Tag,
        }
      ).as('createTag');

      cy.getBySel('sidenavCreateTagButton').click();
      cy.getBySel('createTagDialogNameInput').type(`Tag 1000`, {
        force: true,
      });

      cy.getBySel('createTagDialogSubmitButton').click();
      cy.getBySel('sidenavTag-1000').should('exist');
    });

    it('should update a tag', async () => {
      const updatedTask: Tag = { id: 2, name: 'Test Tag' };

      cy.intercept(
        {
          method: 'PATCH',
          url: `${Cypress.env('apiBaseUrl')}/tags/1`,
        },
        {
          body: updatedTask,
        }
      ).as('updateTag');

      cy.getBySel('sidenavTagOptionsButton-2').click({ force: true });
      cy.getBySel('sidenavEditTagDialogButton-2').click();
      cy.getBySel('editTagDialogNameInput').clear().type(updatedTask.name, {
        force: true,
      });

      cy.getBySel('editTagDialogSubmitButton').click();
      cy.getBySel('sidenavTag-2').should('contain', updatedTask.name);
    });
  });
});
