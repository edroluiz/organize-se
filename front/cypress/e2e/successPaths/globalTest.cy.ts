describe('Teste Completo', () => {
  it('Executa todas as ações', () => {
    // Registro de usuário.
    cy.visit('http://localhost:4200/cadastro');
    cy.get('#username').type('admin');
    cy.get('#password').type('123');
    cy.get('#confirmPassword').type('123');
    cy.get('button').contains('Cadastrar').click();
    cy.url().should('eq', 'http://localhost:4200/login');

    // Login.
    cy.visit('http://localhost:4200/login');
    cy.get('#username').type('admin');
    cy.get('#password').type('123');
    cy.get('button').contains('Entrar').click();
    cy.url().should('eq', 'http://localhost:4200/home');

    // Check user name
    cy.visit('http://localhost:4200/home');
    cy.contains('Olá, admin');

    // Create Task
    cy.get('#name').type('Terminar os testes de unidade do backend');
    cy.get('#filled').check();
    cy.get('button').contains('Salvar').click();

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

    // Delete task
    cy.visit('http://localhost:4200/minhasAtividades');
    cy.get('.list-group-item').first().as('tarefa');
    cy.get('@tarefa').find('.text-xl').invoke('text').as('textoAntesDaExclusao');
    cy.get('@tarefa').find('svg[viewBox="0 0 20 20"]').last().click();
    cy.get('.mat-icon#close-icon').should('be.visible');
    cy.get('.mat-flat-button#yes-button').click();

    // Create Task
    cy.visit('http://localhost:4200/home');
    cy.get('#name').type('Terminar os testes de unidade do frontend');
    cy.get('#filled').check();
    cy.get('button').contains('Salvar').click();

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

    // Saída do sistema (Logout).
    cy.get('button').contains('Sair').click();
    cy.url().should('eq', 'http://localhost:4200/login');
  });
});
