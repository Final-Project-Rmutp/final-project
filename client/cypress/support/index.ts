// cypress/support/index.ts
Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})