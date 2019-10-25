Cypress.Commands.add('verifyTitle', (data) => {
  cy.title().should('eq', data);
});

Cypress.Commands.add('enterEmail', (loc,data) => {
  cy.get(loc.emailFieldId).type(data);
});

Cypress.Commands.add('enterPassword', (loc,data) => {
  cy.get(loc.passwordFieldId).type(data);
});

Cypress.Commands.add('loginButton', (loc) => {
  cy.get(loc.loginButton).submit();
});

Cypress.Commands.add('clickNavBarDropDownButton', (loc) => {
  cy.get(loc.navBarDropDownId).click({force:true});
});

Cypress.Commands.add('clickNewUserDropdownNavItem', (loc) => {
	cy.get(loc.newUserDropdownNavItem).click({force:true});
});

Cypress.Commands.add('clickSignOutOption', (data) => {
	cy.contains(data).click({force:true})
});