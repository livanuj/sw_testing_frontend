/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('User List end to end', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays user table', () => {
    cy.get('[data-testid="user-table"]').should('have.class', 'user-table')
    cy.get('[data-testid="user-table-head"]').contains("Name")
  })

  it('can add new user', () => {
    const name = 'Elon Musk'
    const username = 'elon_twitter'
    const email = 'elon_m@abc.com'
    const webiste = 'twitter.com'

    cy.get('[data-testid="add-user-button"]').click()
    cy.get('#exampleModalCenteredScrollableLabel').contains('CREATE')

    cy.get('[data-testid="user-input-name"]').type(name)
    cy.get('[data-testid="user-input-username"]').type(username)
    cy.get('[data-testid="user-input-email"]').type(email)
    cy.get('[data-testid="user-input-website"]').type(webiste)

    cy.get('[data-testid="submit-button"').click()

    cy.get('.Toastify__toast-body > :nth-child(2)').contains("User Created Successfully")

    cy.get(':nth-child(1) > .gap-3').contains(name)
    cy.get('.divide-y > :nth-child(1) > :nth-child(2)').contains(username)
    cy.get('.divide-y > :nth-child(1) > :nth-child(3)').contains(email)
    cy.get('.divide-y > :nth-child(1) > :nth-child(4)').contains(webiste)
  })

  it('validates empty username while creating user', () => {
    const name = 'Elon Musk'
    const email = 'elon_m@abc.com'

    cy.get('[data-testid="add-user-button"]').click()
    cy.get('#exampleModalCenteredScrollableLabel').contains('CREATE')

    cy.get('[data-testid="user-input-name"]').type(name)
    cy.get('[data-testid="user-input-email"]').type(email)

    cy.get('[data-testid="submit-button"').click()

    cy.get('.Toastify__toast-body > :nth-child(2)').contains("Validation failed")
  })

  it('can update existing user', () => {
    const name = "Updated Elon Musk"
    const email = "elon_update@gmail.com"
    cy.get(':nth-child(1) > :nth-child(5) > .flex > [x-data="{ tooltip: \'Edite\' }"] > .h-6').click()
    cy.get('#exampleModalCenteredScrollableLabel').contains('EDIT')

    cy.get('[data-testid="user-input-name"]').clear().type(name)
    cy.get('[data-testid="user-input-email"]').clear().type(email)
    cy.get('[data-testid="submit-button"').click()

    cy.get('.Toastify__toast-body > :nth-child(2)').contains("User Updated Successfully")
    cy.get(':nth-child(1) > .gap-3').contains(name)
    cy.get('.divide-y > :nth-child(1) > :nth-child(3)').contains(email)
  })

  it('validates wrong email while updating existing user', () => {
    const name = "Updated Elon Musk"
    const invalidEmail = "elon_update"
    cy.get(':nth-child(1) > :nth-child(5) > .flex > [x-data="{ tooltip: \'Edite\' }"] > .h-6').click()
    cy.get('#exampleModalCenteredScrollableLabel').contains('EDIT')

    cy.get('[data-testid="user-input-name"]').clear().type(name)
    cy.get('[data-testid="user-input-email"]').clear().type(invalidEmail)
    cy.get('[data-testid="submit-button"').click()

    cy.get('.Toastify__toast-body > :nth-child(2)').contains("Validation failed")
  })

  it('can check off an item as completed', () => {
    cy.get(':nth-child(1) > :nth-child(5) > .flex > [x-data="{ tooltip: \'Delete\' }"] > .h-6').click()
    cy.get('#exampleModalCenteredScrollableLabel').contains('DELETE')

    cy.get('[data-testid="submit-button"').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').contains("User Deleted Successfully")

    cy.get(':nth-child(1) > .gap-3')
      .should('not.have.text', 'Updated Elon Musk')

  })
})
