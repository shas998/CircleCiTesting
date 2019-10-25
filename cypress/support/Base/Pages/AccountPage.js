Cypress.Commands.add('enterSearchData', (loc,data) => {
  cy.get(loc.searchFieldId).type(data);
});

Cypress.Commands.add('enterAuthenticationPassword', (loc,data) => {
  cy.get(loc.authenticationPasswordInputId).type(data);
});

Cypress.Commands.add('clickSearchIcon', (loc) => {
  cy.get(loc.searchIcon).click();
});

Cypress.Commands.add('verifySearchResult', (loc) => {
  cy.wait(5000);
  if(Cypress.$(loc.accountLink).length==0){
    cy.log('runner get stops');
    Cypress.runner.stop();
    throw error;
  }
  else{
    cy.get(loc.tableRowId).should('have.length', 1);
  }
});

Cypress.Commands.add('clickNewButton', (loc) => {
  cy.get(loc.newButton).click();
});

Cypress.Commands.add('verifyUrl', (data) => {
  cy.url().should('include', data);
});

Cypress.Commands.add('enterAccountName', (loc,data) => {
  cy.get(loc.accountName).clear();
  cy.get(loc.accountName).type(data);
});

Cypress.Commands.add('enterAccountLicenseDate', (loc,data) => {
  cy.get(loc.accountLicenseDate).type(data);
});

Cypress.Commands.add('clickSaveButton', (loc) => {
  cy.wait(2000);
  cy.get(loc.saveButton).click({force:true});
});

Cypress.Commands.add('verifySuccessAlertMessage', (loc, data) => {
  cy.get(loc.sucessAlertId).should('contain', data);
});

Cypress.Commands.add('uncheckAccoutLockedCheckbox', (loc) => {
    cy.get(loc.lockedCheckbox).click();
});

Cypress.Commands.add('uncheckCheckbox', (loc) => {
  cy.wait(2000);
  if (Cypress.$(loc.lockedCheckbox).prop('checked')) {
    cy.get(loc.lockedCheckbox).click();
    cy.wait(1000);
   }
   else {
    cy.log('checkbox is unchecked');
   }
});

Cypress.Commands.add('checkedAccountLockCheckbox', (loc) => {
  cy.wait(2000);
  if (Cypress.$(loc.lockedCheckbox).prop('checked')) {
    cy.log('checkbox is checked');
   }
   else {
    cy.get(loc.lockedCheckbox).click();
    cy.wait(1000);
   }
});

Cypress.Commands.add('openAccountUsingLink', (loc,index) => {
  cy.get(loc.accountLink, {timeout: 20000}).eq(index).click({force:true});
  cy.wait(4000);
});

Cypress.Commands.add('clickOnEditButton', (loc) => {
  cy.get(loc.editButton).click();
});

Cypress.Commands.add('clickAuthenticationPasswordSubmitButton', (loc) => {
  cy.get(loc.summitAuthenticationPasswordId).click();
});

Cypress.Commands.add('clickInactiveAccountCheckbox', (loc) => {
  cy.get(loc.inactiveAccountCheckboxId).click({force:true});
});

Cypress.Commands.add('clickSpiClientCheckbox', (loc) => {
  cy.get(loc.spiClientCheckboxId).click({force:true});
});

Cypress.Commands.add('selectAccountStatus', (loc, data) => {
  cy.get(loc.statusDropdownId).select(data).should('have.value', data);
});

Cypress.Commands.add('clickOnDeleteButton', (loc) => {
  cy.get(loc.deleteButton).click();
});

Cypress.Commands.add('clickOnCancelButton', (loc) => {
  cy.get(loc.cancelButton).click();
});

Cypress.Commands.add('clickOnImageCloseIcon', (loc) => {
  cy.get(loc.imageCloseIconId).click();
});

Cypress.Commands.add('verifyImageCloseIcon', (loc) => {
  cy.get(loc.imageCloseIconId).should('not.be.visible');
});

Cypress.Commands.add('exportStatistic', (loc, data) => {
  cy.get(loc.exportStatisticButton).invoke('attr', 'href').and('include', data).then((href) => {
    cy.log(href);
    cy.request(href).then((resp) => {
      expect(resp.status).to.eq(200);
    })
  })
});

Cypress.Commands.add('verifyImageName', (loc, data) => {
  cy.get(loc).invoke('attr', 'src').then((src) => {
    expect(src).include(data);
  })
});

Cypress.Commands.add('verifyInactiveAccountInTable', (loc, tdIndex, data, data1) => {
  cy.wait(5000);
 cy.get('#account_list tbody td:nth-child(1) a').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#account_list tbody tr:nth-child(${++index}) td:nth-child(${tdIndex})`).invoke('text').then((text) => {
      expect(text).to.include(data1);
    })
    }
    else {
      cy.log('no inactive account present in table');
    }
  })
});
