describe('Complete task', () => {
  it('Tarefa concluída com sucesso', () => {
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

    // Complete task
    cy.visit('http://localhost:4200/minhasAtividades');
    cy.get('.list-group-item').first().as('tarefa');
    cy.get('@tarefa').find('input[type="checkbox"]').then(($checkbox) => {
      const tarefaNaoConcluida = $checkbox.is(':not(:checked)');
      if (tarefaNaoConcluida) {
        cy.get('@tarefa').find('input[type="checkbox"]').click();
        cy.get('@tarefa').find('input[type="checkbox"]').should('be.checked');
        cy.get('.mat-flat-button#yes-button').click();
      }
    });
  });
});

