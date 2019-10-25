Cypress.Commands.add('enterAssessmentName', (loc, data) => {
  cy.get(loc.assessmentNameField).clear();
  cy.get(loc.assessmentNameField).type(data);
});

Cypress.Commands.add('enterBehaviorAssessmentName', (loc, data) => {
  cy.get(loc.behaviorAssessmentNameFieldId).clear();
  cy.get(loc.behaviorAssessmentNameFieldId).type(data);
});

Cypress.Commands.add('selectAssessmentDropdownValues', (loc, index, data) => {
	cy.get(loc.assessmentDropdownId).eq(index).select(data);
});

Cypress.Commands.add('checkAllKnowledgeQuestionCheckbox', (loc, index) => {
	cy.wait(3000);
	cy.get(loc.assessmentKnowledgeQuestionCheckboxId).eq(index).scrollIntoView().click({force:true});
	cy.wait(3000);
});

Cypress.Commands.add('checkAllBehaviorQuestionCheckbox', (loc, index) => {
	cy.wait(3000);
	cy.get(loc.assessmentBehaviorQuestionCheckboxId).eq(index).scrollIntoView().click({force:true});
	cy.wait(3000);
});

Cypress.Commands.add('clickButtonOnKnowledgeAssessment', (loc, index) => {
	cy.wait(2000);
	cy.get(loc).eq(index).click();
});

Cypress.Commands.add('clickAssessmentUserCollectionAddButton', (loc) => {
	cy.get(loc.assessmentUserCollectionAddButtonId).click();
});

Cypress.Commands.add('selectAssessmentUserCollectionCheckbox', (loc, index) => {
	cy.get(loc.assessmentUserCollectionCheckboxesId).eq(index).check();
});

Cypress.Commands.add('enterAssessmentUserCollectionDueDate', (loc, data) => {
	cy.get(loc.assessmentUserCollectionDueDateId).clear();
	cy.get(loc.assessmentUserCollectionDueDateId).type(data);
});

Cypress.Commands.add('clickAssessmentUserCollectionLinkInTable', (loc, index) => {
	cy.get(loc.assessmentUserCollectionNameLinkId).eq(index).click({force:true});
	cy.wait(3000);
});

Cypress.Commands.add('clickKnowledgeAssessmentCollapseArrow', (loc, index) => {
	cy.get(loc.knowledgeAssessmentCollapseArrowId).eq(index).click();
});

Cypress.Commands.add('clickKnowledgeAssessmentQuestionViewButton', (loc) => {
	cy.get(loc.knowledgeAssessmentQuestionViewId).click();
});

Cypress.Commands.add('clickBehaviorAssessmentQuestionViewButton', (loc) => {
	cy.wait(2000);
	cy.get(loc.behaviorAssessmentQuestionViewId).click({force:true});
});

Cypress.Commands.add('VerifyKnowledgeQuestionTextAfterClickOnViewButton', (loc, data) => {
	cy.get(loc.translationTextId, {timeout:20000}).should('contain', data);
});

Cypress.Commands.add('verifyAddedLanguageInQuestionTable', (loc, data) => {
	cy.get(loc.questionLanguageId).should('contain', data);
});

Cypress.Commands.add('verifyAddedLanguageInBehaviorTable', (loc, data) => {
	cy.get(loc.behaviorLanguageId).should('contain', data);
});

Cypress.Commands.add('verifyDeletedLanguageInBehaviorTable', (loc, data) => {
	cy.get(loc.behaviorLanguageId).should('not.contain', data);
})

Cypress.Commands.add('verifyActiveDateInUserCollectionIsVisible', (loc) => {
	cy.get(loc.activeDateUserCollectionId).should('be.visible');
});

Cypress.Commands.add('verifyActiveDateInUserCollectionIsNotVisible', (loc) => {
	cy.get(loc.activeDateUserCollectionId).should('not.be.visible')
});

Cypress.Commands.add('clickEditLanguageButton', (loc, data) => {
	//cy.get(loc.editLanguageButtonId).click();
	cy.get('div#bai-translation table td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
   cy.log($el.text());
   cy.log(index);
   if ($el.text() === data) {
   	cy.log(index);
     cy.log('we are deleting the module: '+ data);                  //print name of module to be deleted.
     cy.get(`div#bai-translation table tr:nth-child(${++index}) td:nth-child(2) a`).click();  //click on delete icon for newly created module.
   } else {
     cy.log('no language founded');
   }
 })
});

Cypress.Commands.add('clickEditLanguageButtonBehaviorAssessment', (loc, data) => {
	//cy.get(loc.editLanguageButtonId).click();
	cy.get('div#bai-translation table td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
   cy.log($el.text());
   cy.log(index);
   if ($el.text() === data) {
   	cy.log(index);
     cy.log('we are deleting the module: '+ data);                  //print name of module to be deleted.
     cy.get(`div#bai-translation table tr:nth-child(${++index}) td:nth-child(3) a`).click();  //click on delete icon for newly created module.
   } else {
     cy.log('no language founded');
   }
 })
});

Cypress.Commands.add('verifyDeletedLanguageInQuestionTable', (loc, data) => {
	cy.get(loc.questionLanguageId).should('not.contain', data)
});

Cypress.Commands.add('exportKnowledge', (loc, index, data) => {
  cy.get(loc.exportKnowledgeButton).eq(index).invoke('attr', 'href').and('include', data).then((href) => {
    cy.log(href);
    cy.request(href).then((resp) => {
      expect(resp.status).to.eq(200);
    })
  })
});