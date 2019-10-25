Cypress.Commands.add('enterAssessmentPeriodName', (loc,data) => {
  cy.get(loc.assessmentInputFieldId).clear();
  cy.get(loc.assessmentInputFieldId).type(data);
});

Cypress.Commands.add('verifySuccessMessageForNewAssessmentPeriod', (loc, data)=> {
	cy.get(loc.successMessageAssessmentPeriodId).should('contain', data);
});

Cypress.Commands.add('verifyStartDateForAssessmentPeriod', (loc, data, text) => {
 //cy.get(loc.editLanguageButtonId).click();
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(2)`).invoke('text').then((value) => {
    	expect(text).contain(value.trim());
    })
    }
    else {
    }
  })
});

Cypress.Commands.add('verifyTargetDateForAssessmentPeriod', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(3)`).invoke('text').then((value) => {
    	expect(text).contain(value.trim());
    })
    } 
    else {
    }
  })
});

Cypress.Commands.add('verifyActiveAssessmentCountInAssessmentPeriodTable', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(4)`).invoke('text').then((value) => {
        expect(text).eq(value.trim());
    })
    } 
    else {
    }
  })
});



Cypress.Commands.add('verifyMakeInactiveButtonInAssessmentPeriodTable', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(5) a`).should('be.visible');
    } 
    else {
    }
  })
});

Cypress.Commands.add('clickMakeInactiveButtonInAssessmentPeriodTable', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(5) a`).click({force:true});
    } 
    else {
    }
  })
});

Cypress.Commands.add('verifyMakeInactiveButtonIsVisibleAfterClickInAssessmentPeriodTable', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(5) a`).should('not.be.visible');
    } 
    else {
    }
  })
});

Cypress.Commands.add('enterAssessmentPeriod', (loc, data) => {
	cy.get(loc).type(data, {force:true});
});