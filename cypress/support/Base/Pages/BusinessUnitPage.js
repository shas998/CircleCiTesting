Cypress.Commands.add('enterBusinessUnitName', (loc,data) => {
  cy.get(loc.businessNameFieldId).clear();
  cy.get(loc.businessNameFieldId).type(data);
});

Cypress.Commands.add('selectBusinessUnitParentDropdownValue', (loc, data) => {
	cy.get(loc.businessParentFieldId).select(data);
});

Cypress.Commands.add('deleteExistingBusinessUnit', (loc) => {
  var len = Cypress.$(loc.businessExistingUnitId).length;
  cy.log('Length: '+len);
  if(len>0){
    cy.get(loc.businessExistingUnitId).eq(0).then((ele) => {
      var text = ele.text();
      cy.log('Exisitng Business Unit Name: '+text);
      cy.wrap(ele).click();
      cy.get(loc.businessExistingTitleId).should('have.text','Business Unit: '+text);
      cy.get(loc.businessExistingDeletionId).click({force:true});
      cy.get(loc.businessExistingSuccessAlertId).should('have.text','×Business unit was successfully deleted.');
    });
  }
});
