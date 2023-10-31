describe('Incorrect task', () => {
  it('Exibir mensagem de erro para atividade incorreta', () => {
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

    // User Name
    cy.visit('http://localhost:4200/home');
    cy.contains('Olá, admin');

    // Task
    cy.get('#name').type('  ');
    cy.get('#filled').check();
    cy.get('button').contains('Salvar').click();
    cy.contains('Você não pode cadastrar uma atividade vazia.').should('be.visible');
  });
});
