Cypress.Commands.add('enterLearningPlanName', (loc, data) => {
  cy.get(loc.learningPlanNameId).clear();
  cy.get(loc.learningPlanNameId).type(data);
});

Cypress.Commands.add('enterCourseName', (loc, data) => {
  cy.get(loc.courseNameId).clear();
  cy.get(loc.courseNameId).type(data);
});

Cypress.Commands.add('enterCourseMappingPassingScore', (loc, data) => {
  cy.get(loc.courseMappingPassingScoreId).clear();
  cy.get(loc.courseMappingPassingScoreId).type(data);
});

Cypress.Commands.add('enterCourseMappingWeight', (loc, data) => {
  cy.get(loc.courseMappingWeightId).clear();
  cy.get(loc.courseMappingWeightId).type(data);
});

Cypress.Commands.add('enterCourseDescription', (loc, data) => {
  cy.get(loc.courseDescriptionId).clear();
  cy.get(loc.courseDescriptionId).type(data);
});

Cypress.Commands.add('enterCourseHours', (loc, data) => {
  cy.get(loc.courseHours).clear();
  cy.get(loc.courseHours).type(data);
});

Cypress.Commands.add('enterCourseMinutes', (loc, data) => {
  cy.get(loc.courseMinutes).clear();
  cy.get(loc.courseMinutes).type(data);
});

Cypress.Commands.add('enterLearningData', (loc, data) => {
  cy.get(loc).clear();
  cy.get(loc).type(data);
});

Cypress.Commands.add('selectLearningSalesRoleDropdownValue', (loc, data) => {
	cy.get(loc.learningSalesRoleDropdownId).select(data);
});

Cypress.Commands.add('selectTranslationLocaleDropdownValue', (loc, data) => {
  cy.get(loc.courseTranslationLocaleId).select(data);
});

Cypress.Commands.add('selectCourseMappingDropdownValue', (loc, index, data) => {
  cy.get(loc.courseMappingDropdownId).eq(index).select(data);
});

Cypress.Commands.add('selectLearningPlanItems', (loc, index, data) => {
	cy.get(loc.learningPlanItemsSelectId).eq(index).select(data);
});

Cypress.Commands.add('clickDeleteSelectedButtonForLearningActivity', (loc) => {
  cy.get(loc.learningActivityDeleteSelectedButtonId).click({force:true});
});

Cypress.Commands.add('selectLearningActivityFieldOption', (loc, data) => {
  cy.get(loc).select(data);
});

Cypress.Commands.add('verifyCreatedCourseInLearningActivity', (loc, data) => {
  cy.get(loc.learningActivityCourseFieldId).select(data).invoke('text').then((text) => {
    expect(text).to.contain(data);
  })
});

Cypress.Commands.add('selectAllCheckboxLearningPlanItems', (loc) => {
	cy.wait(5000);
	cy.get(loc.learningPlanItemsCheckboxId).click({force:true});
});

Cypress.Commands.add('enterRelativeOrder', (loc, data) => {
	cy.get(loc.learningRelativeOrderId).clear();
	cy.get(loc.learningRelativeOrderId).type(data);
});

Cypress.Commands.add('clickLearningPlanCollapseArrow', (loc, index) => {
  cy.wait(4000);
  cy.get(loc.learningPlanCollapseArrowId, {timeout: 20000}).eq(index).click({force:true});
  cy.wait(2000);
});

Cypress.Commands.add('verifyLearningCompetenciesList', (loc, length) => {
  cy.get(loc.learningPlanCompetenciesTableListId).should('have.length', length);
});

Cypress.Commands.add('selectAddedLearningCompetenciesInList', (loc) => {
  cy.get(loc.learningPlanCompetenciesCheckboxId).last().click({force:true});
});

Cypress.Commands.add('verifyLearningCompetencyModelText', (loc, data) => {
  cy.wait(4000);
  cy.get(loc.learningCompetencyModelId, {timeout: 20000}).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('selectLearningCompetenciesCheckbox', (loc, index) => {
  cy.get(loc.learningCompetenciesCheckboxId).eq(index).click({force: true});
});

Cypress.Commands.add('clickOnLearningCompetenciesModelButton', (loc) => {
  cy.get(loc.learningCompetenciesModelButtonId).click({force:true});
});


Cypress.Commands.add('verifyValueInLearningPlanTable', (loc, tdIndex, data, data1) => {
 cy.get('table tbody tr td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`table tbody tr:nth-child(${++index}) td:nth-child(${tdIndex})`).invoke('text').then((text) => {
    	expect(text).to.include(data1);
    })
    }
    else {
      cy.log('no learning plan found');
    }
  })
});

Cypress.Commands.add('verifyLearningPlanNameInUserList', (loc, data, tdIndex, data1, learningActivity) => {
  cy.get('#learning-plans-tree tbody tr td span.lp-name-indent').each(($e1, index, $list) => {
    cy.log($e1.text());
    if($e1.text() === data) {
      cy.get(`table tbody tr:nth-child(${++index}) td:nth-child(1) span.fa.fa-plus`).click({force:true});
      cy.get(`table tbody tr:nth-child(2) td:nth-child(1)`).each(($e1, index, $list) => {
        cy.log($e1.text());
        if($e1.text() === learningActivity) {
        cy.get(`table tbody tr:nth-child(${++index+1}) td:nth-child(${tdIndex})`).invoke('text').then((text) => {
          expect(text).to.include(data1);
        })
      }
      else {
        cy.log('no online course found in learning plan');
      }
      })
    }
    else{
      cy.log('no learning plan is assign to user');
    }
  })
});

Cypress.Commands.add('clickViewButtonOfLearningActivity', (loc, data, indexNum) => {
 cy.get('.table.table-striped tbody td:nth-child(2)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${indexNum}) a`).click({force:true});  //click on delete icon for newly created module.
    }
    else {
      cy.log('no learning activity found');
    }
  })
});

Cypress.Commands.add('clickViewButtonOfCourse', (loc, data, indexNum) => {
 cy.get('#account-specific-courses tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#account-specific-courses tbody tr:nth-child(${++index}) td:nth-child(${indexNum}) a`).click({force:true});  //click on delete icon for newly created module.
    }
    else {
      cy.log('no course found');
    }
  })
});

Cypress.Commands.add('clickEditButtonOfCourseTranslation', (loc, data, indexNum) => {
 cy.get('#comptency-translation tbody tr td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#comptency-translation tbody tr:nth-child(${++index}) td:nth-child(${indexNum}) a`).eq(1).click({force:true});  //click on delete icon for newly created module.
    }
    else {
      cy.log('no translation found');
    }
  })
});

Cypress.Commands.add('clickViewButtonOfCourseMapping', (loc, data, indexNum) => {
 cy.get('#account-feature tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#account-feature tbody tr:nth-child(${++index}) td:nth-child(${indexNum}) a`).click({force:true});  //click on delete icon for newly created module.
    }
    else {
      cy.log('no course found');
    }
  })
});

Cypress.Commands.add('verifyCourseMappingTableValue', (loc, data, indexNum, proficiencyLevel) => {
 cy.get('#account-feature tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`#account-feature tbody tr:nth-child(${++index}) td:nth-child(${indexNum})`).invoke('text').then((text) => {
      expect(text).eq(proficiencyLevel);
    })
    }
    else {
      cy.log('no course found');
    }
  })
});

Cypress.Commands.add('clickCheckboxOfLearningActivity', (loc, data, indexNum) => {
 cy.get('.table.table-striped tbody td:nth-child(2)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${indexNum}) input`).click({force:true});  //click on delete icon for newly created module.
    }
    else {
      cy.log('no learning activity found');
    }
  })
});

Cypress.Commands.add('verifyLearningActivityStatus', (loc, data, indexNum, status) => {
 cy.get('.table.table-striped tbody td:nth-child(2)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${indexNum})`).invoke('text').then((text) => {
      expect(text).eq(status);
    })
    }
    else {
      cy.log('no status found');
    }
  })
});

Cypress.Commands.add('verifyActiveDateInNewLearningUserCollectionIsVisible', (loc) => {
  cy.get(loc.newLearningUserCollectionActiveFieldId).should('be.visible');
});

Cypress.Commands.add('verifyActiveDateInNewLearningUserCollectionIsNotVisible', (loc) => {
  cy.get(loc.newLearningUserCollectionActiveFieldId).should('not.be.visible')
});

Cypress.Commands.add('enterNewLearningUserCollectionDueDate', (loc, data) => {
  cy.get(loc.newLearningUserCollectionDueDateFieldId).clear();
  cy.get(loc.newLearningUserCollectionDueDateFieldId).type(data);
});

Cypress.Commands.add('clickNewLearningUserCollectionLinkInTable', (loc, index) => {
  cy.get(loc.newLearningUserCollectionNameLinkId).eq(index).click({force:true});
  cy.wait(3000);
});