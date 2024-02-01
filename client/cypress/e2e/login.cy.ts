// login.spec.ts

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });
    it('should successfully log in with valid credentials', () => {

    
        cy.get('[data-cy=input-idStudent]').type('1');
        cy.wait(1000)
        cy.get('[data-cy=input-idCard]').type('1');
        cy.wait(1000)
        cy.get('[data-cy=login-btn]').click();

    });
});
