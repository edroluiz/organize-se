describe('Create task successfully', () => {
  it('Atividade criada com sucesso', () => {
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

    // Check user name
    cy.visit('http://localhost:4200/home');
    cy.contains('Olá, admin');

    // Create Task
    cy.get('#name').type('Terminar os testes de unidade do backend');
    cy.get('#filled').check();
    cy.get('button').contains('Salvar').click();
  });
});
