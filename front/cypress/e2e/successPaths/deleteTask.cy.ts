describe('Delete task', () => {
  it('Atividade excluída com sucesso', () => {
    // Register
    cy.visit('http://localhost:4200/cadastro');
    cy.get('#username').type('admin');
    cy.get('#password').type('123');
    cy.get('#confirmPassword').type('123');
    cy.get('button').contains('Cadastrar').click();
    cy.url().should('eq', 'http://localhost:4200/login');

    // Login
    cy.visit('http://localhost:4200/login');
    cy.get('#username').type('admin');
    cy.get('#password').type('123');
    cy.get('button').contains('Entrar').click();
    cy.url().should('eq', 'http://localhost:4200/home');

    // Delete task
    cy.visit('http://localhost:4200/minhasAtividades');
    cy.get('.list-group-item').first().as('tarefa');
    cy.get('@tarefa').find('.text-xl').invoke('text').as('textoAntesDaExclusao');
    cy.get('@tarefa').find('svg[viewBox="0 0 20 20"]').last().click();
    cy.get('.mat-icon#close-icon').should('be.visible');
    cy.get('.mat-flat-button#yes-button').click();
    cy.get('@tarefa').should('not.be.visible');
  });
});
