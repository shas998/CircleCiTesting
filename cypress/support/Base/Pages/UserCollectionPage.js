Cypress.Commands.add('enterUserCollectionName', (loc,data) => {
  cy.get(loc.userCollectionInputFieldId).clear();
  cy.get(loc.userCollectionInputFieldId).type(data);
});

Cypress.Commands.add('verifySuccessMessageForNewUserCollection', (loc, data)=> {
	cy.get(loc.successMessageUserCollectionId).should('contain', data);
});

Cypress.Commands.add('enterUserCollectionDescription', (loc,data) => {
  cy.get(loc.userCollectionDescriptionId).clear();
  cy.get(loc.userCollectionDescriptionId).type(data);
});

Cypress.Commands.add('selectAllUserCollectionCheckboxs', (loc) => {
	cy.get(loc.userCollectionCheckboxId).click({multiple: true});
});

Cypress.Commands.add('verifyContentInAssessmentTable', (loc, data) => {
	cy.get(loc).invoke('text').then((text) => {
		expect(Cypress.moment(text).format('DD-MMM-YY')).eq(data);
	})
});

Cypress.Commands.add('verifyAssessmentNameInAssessmentTable', (loc, data) => {
	cy.get(loc).invoke('text').then((text) => {
		expect(text).eq(data);
	})
});

Cypress.Commands.add('verifyActiveStatusInAssessmentTable', (loc, data) => {
	cy.get(loc).invoke('attr','aria-hidden').then((text) => {
		expect(text).eq(data);
	})
});