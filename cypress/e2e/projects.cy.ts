describe('Projects', () => {
  beforeEach(() => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });

  describe('Create project', () => {
    it('should create a new project', () => {
      cy.getBySel('sidenavProjectsList')
        .children()
        .then((children) => {
          const count = children.length;
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
  });
});
