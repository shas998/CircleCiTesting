Cypress.Commands.add('verifyPageTitle', (loc, data) => {
  cy.wait(5000);
  cy.get(loc).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyValidationMessage', (loc, data) => {
  cy.get(loc).invoke('text').should('contain', data);
});

Cypress.Commands.add('verifyValidationMessageByIndex', (loc, data, index) => {
  cy.get(loc).eq(index).invoke('text').should('contain', data);
});

Cypress.Commands.add('verifyMessage', (loc, data) => {
  cy.get(loc).invoke('text').should('contain', data);
});

Cypress.Commands.add('clickUsingXpath', (loc) => {
  cy.wait(5000);
  cy.xpath(loc).click({force: true});
});

Cypress.Commands.add('selectOptionFromSelectElement', (loc,data) => {
  cy.get(loc).then(($select) => {
  const opt = $select.find('option').eq(data)
  $select.val(opt.attr('value'))
  return $select
}).trigger('change')
});

Cypress.Commands.add('verifyElementExistOrNot', (loc,data) => {
  cy.get(loc).should(data);
});
