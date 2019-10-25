Cypress.Commands.add('enterTerritoryName', (loc,data) => {
  cy.get(loc.territorNameFieldId).clear();
  cy.get(loc.territorNameFieldId).type(data);
});

Cypress.Commands.add('selectTerritorParentDropdownValue', (loc, data) => {
	cy.get(loc.territorParentFieldId).select(data);
});

Cypress.Commands.add('verifyUserInTerritoryTable', (loc, data) => {
	cy.get(loc.territorUserListId).invoke('text').then((text) => {
		expect(text).eq(data);
	})
});

Cypress.Commands.add('verifyNumberOfUserCountInTerritory', (loc, data, index1) => {
 cy.get('#territory-org-tree tbody tr td a').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#territory-org-tree tbody tr:nth-child(${++index}) td:nth-child(2)`).invoke('text').then((text) => {
    	expect(Number(text.trim())).eq(index1);
    })
    } 
    else {
      cy.log('no Territory found');
    }
  })
});