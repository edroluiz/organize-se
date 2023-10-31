describe('Edit task', () => {
  it('Atividade editada com sucesso', () => {
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

    // Edit task
    cy.visit('http://localhost:4200/minhasAtividades');
    cy.get('.list-group-item').first().as('tarefa');
    cy.get('@tarefa').find('.text-xl').invoke('text').as('textoAntesDaEdicao');
    cy.get('@tarefa').find('svg[viewBox="0 0 20 20"]').first().click();
    cy.get('@tarefa').find('.border-b-2').type(' - Editado');
    cy.get('@tarefa').find('button').contains('Salvar Alteração').click();
    cy.get('@tarefa').find('.text-xl').invoke('text').as('textoDepoisDaEdicao');
    cy.get('@textoAntesDaEdicao').then((textoAntes) => {
      cy.get('@textoDepoisDaEdicao').should('eq', textoAntes, ' - Editado');
    });
  });
});
