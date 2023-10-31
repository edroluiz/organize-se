describe('Task registered successfully', () => {
  it('Atividade registrada com sucesso', () => {
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


    cy.visit('http://localhost:4200/minhasAtividades');

    cy.contains('Área de Atividades');
    cy.contains('Aqui você pode gerenciar suas atividades diárias, escolhendo entre editá-las, concluí-las ou excluí-las.');

    cy.get('.list-group-item').contains('Terminar os testes de unidade do backend').should('exist');
  });
});
