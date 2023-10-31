describe('Registration and login successful', () => {
  it('Deve cadastrar um novo usuário e fazer login com sucesso', () => {
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
  });
});
