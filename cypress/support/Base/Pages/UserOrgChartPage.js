Cypress.Commands.add('exportUserListFromUserOrgChart', (loc, data) => {
  cy.get(loc).invoke('attr', 'href').and('include', data).then((href) => {
    cy.log(href);
    cy.request(href).then((resp) => {
      expect(resp.status).to.eq(200);
    })
  })
});
