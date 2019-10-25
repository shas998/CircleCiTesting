Cypress.Commands.add('enterSalesName', (loc,data) => {
  cy.get(loc.saleInputFieldId).clear();
  cy.get(loc.saleInputFieldId).type(data);
});

Cypress.Commands.add('verifySuccessMessageForNewSales', (loc, data)=> {
	cy.get(loc.successMessageSales).should('contain', data);
});

Cypress.Commands.add('selectTemplateDropdownValue', (loc, data) => {
	cy.get(loc.templateSelectId).select(data);
});

Cypress.Commands.add('verifySalesName', (loc, data) => {
	cy.get(loc).invoke('text').should('eq', data);
});

Cypress.Commands.add('verifyCancelButtonShouldNotVisible', (loc) => {
	cy.get(loc).should('not.be.visible');
});

Cypress.Commands.add('clickGrowthAlignedGoalDropdownIcon', (loc) => {
	cy.get(loc.growthAlignedGoalDropdownIcon).click();
});

Cypress.Commands.add('clickGrowthAlignedGoalDropdownIconByIndex', (loc, index) => {
	cy.get(loc.growthAlignedGoalDropdownIcon).eq(index).click({force:true});
});

Cypress.Commands.add('clickGrowthAlignedGoalNewButton', (loc) => {
	cy.get(loc.growthAlignedGoalNewButton).click();
});

Cypress.Commands.add('clickGrowthAlignedGoalNewButtonByIndex', (loc, index) => {
	cy.get(loc.growthAlignedGoalNewButton).eq(index).click({force:true});
});

Cypress.Commands.add('verifyGrowthAlignedGoalPopupText', (loc, data) => {
	cy.get(loc.growthAlignedGoalPopupTextId).should('have.text', data)
});

Cypress.Commands.add('selectMetricOption', (loc, data) => {
	cy.get(loc.metricId).select(data);
});


Cypress.Commands.add('enterMetricDisplayName', (loc,data) => {
  cy.get(loc.metricDisplayNameId).clear();
  cy.get(loc.metricDisplayNameId).type(data);
});


Cypress.Commands.add('enterGoalValue', (loc,data) => {
  cy.get(loc.goalId).clear();
  cy.get(loc.goalId).type(data);
});

Cypress.Commands.add('verifyMetricNameInTable', (loc, data) => {
	cy.get(loc.metricNameInTableId).should('have.text', data)
});

Cypress.Commands.add('verifyMetricNameInTableBylist', (loc, data) => {
	cy.wait(5000);
	cy.get('#competency_metric_weighting table tbody tr td:nth-child(1)').each(($el, index, $list) => {
		cy.log($el.text());
		if ($el.text() === data) {
			cy.get(`#competency_metric_weighting table tbody tr:nth-child(${++index}) td:nth-child(1)`).eq(0).invoke('text').then((text) => {
				expect(text).to.include(data);
			})
		}
		else {
			cy.log('no metric found');
		}
    });
});

Cypress.Commands.add('clickOnMetricEditButton', (loc) => {
	cy.get(loc.metricEditButton, { timeout: 20000 }).click();
});

Cypress.Commands.add('verifyMetricVisibleAfterDelete', (loc) => {
	cy.get(loc.metricNameInTableId).should('not.be.visible');
});

Cypress.Commands.add('selectCompetencyCheckbox', (loc, index) => {
	cy.get(loc.competencyCheckboxesId).eq(index).click();
});

Cypress.Commands.add('selectStrategicCheckbox', (loc, index) => {
	cy.get(loc.strategicCheckboxesId).eq(index).click();
});

Cypress.Commands.add('selectProficiencyLevelOption', (loc, index, data) => {
	cy.get(loc.proficiencyLevelId).eq(index).select(data);
});

Cypress.Commands.add('clickUserCollectionButton', (loc, index) => {
	cy.get(loc.userCollectionButtonId).eq(index).click();
});

Cypress.Commands.add('enterUserNameInAddUserPopupSearchField', (loc,data) => {
  cy.get(loc.searchInputFieldAddUserPopupId).clear();
  cy.get(loc.searchInputFieldAddUserPopupId).type(data);
});

Cypress.Commands.add('clickSearchButtonOnAddUserPopup', (loc) => {
	cy.get(loc.searchButtonAddUserPopupId).click();
});

Cypress.Commands.add('selectCheckboxOnAddUserPopup', (loc) => {
	cy.wait(2000);
	cy.get(loc.checkboxOnAddUserPopupId).click();
	cy.wait(4000);
});

Cypress.Commands.add('clickAddSelectedUserButton', (loc) => {
	cy.get(loc.addSelectedUserButtonId).click();
});

Cypress.Commands.add('verifySuccessMessageForAddSelectedUser', (loc) => {
	cy.get(loc.countOfSearchedUser, { timeout: 20000 }).its('length').then((length) => {
		cy.get(loc.closeUserPopup).click(); // click on close icon
		cy.get(loc.userCollectionRowId, { timeout: 20000 }).its('length').then((length1) => {
			expect(length).eq(length1)
		})
	})
});

Cypress.Commands.add('selectUserCollectionCheckbox', (loc, index) => {
	cy.get(loc.userCollectionCheckboxId).eq(index).click();
});

Cypress.Commands.add('verifySuccessMessageForUserSales', (loc, data)=> {
	cy.get(loc.successMessageUserSales).should('contain', data);
});

Cypress.Commands.add('searchAddedUserForSales', (loc) => {
	cy.get(loc.nameOfSelectedUserId).invoke('text').then((text) => {
		cy.get(loc.salesUserSearchFieldUId).clear();
		cy.get(loc.salesUserSearchFieldUId).type(text);
	})
});

Cypress.Commands.add('searchUserInUserGroup', (loc, data) => {
	cy.get(loc.salesUserSearchFieldUId).clear();
	cy.get(loc.salesUserSearchFieldUId).type(data);
});

Cypress.Commands.add('verifySearchResultOfUserCollection', (loc) => {
  cy.get(loc.userCollectionRowId).should('have.length', 1);
});

Cypress.Commands.add('verifyErrorMessageInGrowthAlignedGoalPopup', (loc, index, data) => {
	cy.get(loc.blankFieldErrorId).eq(index).invoke('text').then((text) => {
		expect(text).eq(data);
	})
});
