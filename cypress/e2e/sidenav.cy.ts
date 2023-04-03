describe('Sidenav', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  describe('Projects', () => {
    it('should create a new project', () => {
      cy.getBySel('sidenavProjectsList')
        .children()
        .then(($children) => {
          const count = $children.length;
          cy.getBySel('createProjectButton').click();
          cy.getBySel('newProjectName').type('Test Project', {
            force: true,
          });

          cy.getBySel('submit').click();

          cy.getBySel('sidenavProjectsList')
            .children()
            .should('have.length', count + 1);
        });
    });

    it('should edit a project', async () => {
      cy.getBySel('sidenavProjectOptionsButton-1').click({ force: true });
      cy.getBySel('sidenavEditProjectDialogButton-1').click();
      cy.getBySel('editProjectNameInput').clear().type('Test Project', {
        force: true,
      });

      cy.getBySel('submitEditProjectButton').click();

      cy.getBySel('sidenavProject-1').should('contain', 'Test Project');
    });
  });
});
