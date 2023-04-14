import React from 'react'
import TableList from './TableList'

describe('TableList Component', () => {
  it('contains ', () => {
    const users = [{
      id: 1,
      name: "Anuj",
      username: "anuj",
      email: "adf@saf.com",
      website: "google.com",
    }, {
      id: 2,
      name: "Elon",
      username: "elon_musk",
      email: "elon@twitter.com",
      website: "twitter.com",
    }]
    cy.mount(<TableList users={users} />)
    cy.get('[data-testid="users-list"]').should('have.length', users.length)
  })
})
