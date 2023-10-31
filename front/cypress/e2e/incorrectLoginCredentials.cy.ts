describe('Incorrect login credentials', () => {
  it('Exibir mensagem de erro para credenciais incorretas no login', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('#username').type('admin000');
    cy.get('#password').type('321');
    cy.get('button').contains('Entrar').click();
    cy.contains('Usuário ou senha incorretos.').should('be.visible');
  });
});
