describe('Incorrect registration credentials', () => {
  it('Exibir mensagem de erro para credenciais incorretas no momento do registro', () => {
    cy.visit('http://localhost:4200/cadastro');
    cy.get('#username').type('admin');
    cy.get('#password').type('123');
    cy.get('#confirmPassword').type('321');
    cy.get('button').contains('Cadastrar').click();
    cy.contains('As senhas precisam ser iguais.').should('be.visible');
  });
});
