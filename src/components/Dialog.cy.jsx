import React from 'react'
import Dialog from './Dialog'

describe('Dialog Component', () => {
  it('contains the correct number of todos', () => {
    const open = true;

    const modalTitle = 'create'
    const children = <div className="w-96 mx-auto px-16"><span>TEST Span</span></div>
  
    cy.mount(<Dialog modalTitle={modalTitle} open={open} >{children}</Dialog>)
    // the component starts running like a mini web app
    cy.get('#exampleModalCenteredScrollableLabel').contains('CREATE')
    cy.get('[data-testid="children-div"]').contains('TEST Span')
  })
})
