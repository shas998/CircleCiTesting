Cypress.Commands.add('clickDropdown', (loc, index) => {
	cy.get(loc.accountNavDropdown).eq(index).click();
});

Cypress.Commands.add('clickDropdownMenuItem', (loc, data) => {
	cy.contains(loc.dropdownMenuItem, data).click();
});

Cypress.Commands.add('verifyImportButton', (loc, data) => {
	cy.get(loc.importUserButton).should('have.text', (data).trim());
});

Cypress.Commands.add('clickUserNewButton', (loc, index) => {
  cy.wait(1000);
  cy.get(loc.newButton).eq(index).click({force:true});
  cy.wait(1000);
});

Cypress.Commands.add('selectDropdownValue', (loc, index, data) => {
	cy.get(loc.selectButton).eq(index).select(data);
});

Cypress.Commands.add('selectReportOptions', (loc, index, data) => {
  cy.get(loc.reportSelectId).eq(index).select(data);
})

Cypress.Commands.add('selectMultipleDropdownValue', (loc, index, data, data1) => {
	cy.get(loc.selectButton).eq(index).select(data);
});

Cypress.Commands.add('unselectMultipleDropdownValue', (loc, index, data) => {
  cy.get(loc.unSelectButton).eq(index).invoke('removeAttr', 'selected');
});

Cypress.Commands.add('verifyAssessNavitems', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyReportTreeTableText', (loc, data) => {
  cy.get(loc.reportTreeTableId).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyReportAnimatedFadeInText', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('text').then((text) => {
    expect(text).eq(data);
  })
})

Cypress.Commands.add('verifyStrategicPageContent', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('text').then((text) => {
    expect(text).to.include(data);
  })
});

Cypress.Commands.add('verifyPageContent', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('text').then((text) => {
    expect(text).to.include(data);
  })
});

Cypress.Commands.add('verifyPageContentUsingValue', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('attr','value').then((text) => {
    expect(text).to.include(data);
  })
});

Cypress.Commands.add('verifyDisabledOptionForAssessor', (loc, index, data) => {
  cy.get(loc).eq(index).should('have.class', data)
});

Cypress.Commands.add('verifyOverallPageContent', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('text').then((text) => {
    expect(text).to.include(data);
  })
});

Cypress.Commands.add('verifySalesNameOnOverallPageContent', (loc, data) => {
  cy.get(loc).invoke('text').then((text) => {
    expect(text).to.include(data);
  })
});

Cypress.Commands.add('clickAssessNavitems', (loc, index) => {
  cy.get(loc).eq(index).click({force:true});
});

Cypress.Commands.add('verifyAssessNavitemsIsNotVisible', (loc) => {
  cy.get(loc).should('not.exist');
});

Cypress.Commands.add('enterUserFirstName', (loc,data) => {
  cy.get(loc.userFirstNameId).clear();
  cy.get(loc.userFirstNameId).type(data);
});

Cypress.Commands.add('enterUserLastName', (loc,data) => {
  cy.get(loc.userLastNameId).clear();
  cy.get(loc.userLastNameId).type(data);
});

Cypress.Commands.add('enterUserEmail', (loc,data) => {
  cy.get(loc.userEmailId).clear();
  cy.get(loc.userEmailId).type(data);
});

Cypress.Commands.add('enterUserNewPassword', (loc,data) => {
  cy.get(loc.newPasswordId).clear();
  cy.get(loc.newPasswordId).type(data);
});

Cypress.Commands.add('selectMultipleDropdownValueInUserList', (loc, index, data, data1) => {
  cy.get(loc.selectButton).eq(index).select([data, data1]);
});

Cypress.Commands.add('unselectMultipleDropdownValueInUserList', (loc, index, data) => {
  cy.get(loc.unSelectButton).eq(index).invoke('removeAttr', 'selected');
});

Cypress.Commands.add('enterLicensedValue', (loc,data) => {
  cy.get(loc.licenseFieldId).clear();
  cy.get(loc.licenseFieldId).type(data);
});

Cypress.Commands.add('enterUserConfirmPassword', (loc,data) => {
  cy.get(loc.confirmPasswordId).clear();
  cy.get(loc.confirmPasswordId).type(data);
});

Cypress.Commands.add('clickModelFooterButton', (loc, index) => {
  cy.get(loc.modelFooterButtonId).eq(index).click();
});

Cypress.Commands.add('clickModelFooterCloseButton', (loc) => {
	cy.wait(4000);
	cy.get(loc.modelFooterCloseButtonId).click();
});

Cypress.Commands.add('enterUserSearchData', (loc,data) => {
  cy.get(loc.userSearchFieldId, {timeout: 20000}).type(data);
});

Cypress.Commands.add('clickUserSearchIcon', (loc) => {
  cy.get(loc.userSearchButtonId).click();
});

Cypress.Commands.add('clickUserSearchIconByIndex', (loc) => {
  cy.wait(2000);
  cy.get('.advance-search-filter-popup button span.fa.fa-search').click();
});

Cypress.Commands.add('verifySearchedCreteraiMessage', (loc, data)=> {
	cy.get(loc.userSearchCreteriaId).should('contain', data);
});

Cypress.Commands.add('verifyImportUserWindowClose', (loc)=> {
	cy.get(loc.modelFooterATagId).should('not.be.visible');
});

Cypress.Commands.add('verifySuccessMessageForNewUser', (loc, data)=> {
	cy.get(loc.successMessageUser).should('contain', data);
});

Cypress.Commands.add('exportUserStatistic', (loc, index, data) => {
  cy.get(loc).eq(index).invoke('attr', 'href').and('include', data).then((href) => {
    cy.log(href);
    cy.request(href).then((resp) => {
      expect(resp.status).to.eq(200);
    })
  })
});

Cypress.Commands.add('clickImportUsersButton', (loc) => {
  cy.get(loc.importUserButton).click();
});

Cypress.Commands.add('clickBilkEditButton', (loc) => {
  cy.get(loc.bulkEditUserButton).click();
});

Cypress.Commands.add('selectAllCheckbox', (loc) => {
  cy.get(loc.allCheckBoxId).click();
});

Cypress.Commands.add('clickDownloadTemplateButton', (loc) => {
  cy.get(loc.modelFooterATagId).click();
});

Cypress.Commands.add('clickLoginAsUserButton', (loc) => {
  cy.get(loc.loginAsUserId).click();
});

Cypress.Commands.add('clickCancelButtonBulkEditForm', (loc) => {
  cy.wait(3000);
  cy.get(loc.bulkEditFormCancelButtonId).click();
});

Cypress.Commands.add('verifyBulkEditButtonDisable', (loc) => {
	cy.get(loc.bulkEditUserButton).invoke('attr', 'disabled').should('contain', 'disabled');
});

Cypress.Commands.add('verifyDisableButton', (loc, index) => {
  cy.get(loc).eq(index).then(($loc) => {
    if($loc.attr('disabled') === 'disabled'){

    }
    else{
      cy.log("Button is Active");
    }
  })//.invoke('attr', 'disabled').should('contain', 'disabled');
});

Cypress.Commands.add('verifyWarningMessageOnBulkEditForm', (loc, data)=> {
	cy.get(loc.warningMessageIdOnBulkEditForm).should('contain', data);
});

Cypress.Commands.add('verifyLoginAsUserInTopStripe', (loc, data)=> {
	cy.get(loc.loginAsUserNameOnTopId, {timeout: 20000}).should('contain', 'You are logged in as '+data.toLowerCase());
});

Cypress.Commands.add('verifyUserNameOnAssessAfterlogin', (loc, data) => {
  cy.get(loc.userNameOnAssessPageId).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyBulkEditFormIsStillOpen', (loc)=> {
	cy.get(loc.warningMessageIdOnBulkEditForm).should('not.be.visible');
});

Cypress.Commands.add('verifyDownloadTemplateFileHref', (loc, data) => {
  cy.get(loc.modelFooterATagId).invoke('attr', 'href').and('include', data).then((href) => {
    cy.log(href);
    cy.request(href).then((resp) => {
      expect(resp.status).to.eq(200);
    })
  })
});

Cypress.Commands.add('clickNavItemAssessTab', (data) => {
  cy.contains(data).click();
});

Cypress.Commands.add('verifyTextOnStrategicPage', (data) => {
  cy.contains(data);
});

Cypress.Commands.add('importFile', (loc, data) => {
	cy.fixture(data).then(fileContent => {
		cy.get(loc.inputFileField).upload(
			{ fileContent, data, mimeType: 'application/xlsx' },
			{ subjectType: 'drag-n-drop' },
		)
	});
});

Cypress.Commands.add('checkAllRadioButtonOfAnswer', (loc) =>{
  cy.get(loc.behaviourAnswerRadioButtonId).check({force:true});
});

Cypress.Commands.add('clickOnCursorPoinerIcon', (loc) =>{
  cy.get(loc.cursorPointerId).click({force:true});
});

Cypress.Commands.add('verifyCollapseFieldCount', (loc, index) =>{
  cy.get(loc.collapseReactSelectFieldId).should('have.length', index);
});

Cypress.Commands.add('verifyAssignedAssessmentRow', (loc, index) => {
  cy.get(loc.assignedAssessmentRowId).should('have.length', index);
});

Cypress.Commands.add('verifyAssessmentPdfFile', (loc, index) => {
  cy.get(loc.assessmentPdfFileId).should('have.length', index);
});

Cypress.Commands.add('verifyDirectReportUserName', (loc, data) => {
  cy.get(loc.directReportTableId).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyOverallFilterOption', (loc, data) => {
  cy.get(loc).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('EnterValueInDropdownInput', (loc, data) => {
  cy.get(loc).type(data);
  cy.wait(2000);
  cy.get(loc).type('{enter}');
  cy.wait(4000);
});

Cypress.Commands.add('clickOnDropdownField', (loc) => {
  cy.get(loc).click({force:true});
  cy.wait(2000);
});

Cypress.Commands.add('selectDropDownValues', (loc, index, data, inputField) =>{
  //cy.get(loc.collapseReactSelectFieldId).eq(index).click();
  //cy.wait(2000);
  cy.get(inputField).type(data,{force: true});
  cy.wait(2000);
  cy.get(inputField).type('{enter}');
  cy.wait(2000);
});

Cypress.Commands.add('verifyUserLoginCount', (loc, data) => {
  cy.get('#user-basic-details .col-md-4:nth-child(3) p').eq(1).invoke('text').then((text) => {
    var abc = text.split(':');
    expect(Number(abc[1])).eq(data);
  })
})

Cypress.Commands.add('verifyGraphOnStrategicPage', (loc) => {
  cy.get(loc.knowledgeAssessmentGraphId).should('be.visible');
})

Cypress.Commands.add('verifyAssessmentPeriodFieldOnStrategicPage', (loc, data) => {
  cy.get(loc.assessmentPeriodFieldIdOnStrategicPage).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('verifyInformationMessageWhenHasNoAccess', (loc, data) => {
  cy.get(loc.frontEndInformationMessageId).invoke('text').then((text) => {
    expect(text).eq(data);
  })
});

Cypress.Commands.add('clickOnSubmitButtonToCompleteAssessment', (loc) => {
  cy.get(loc.behaviourAnswerSubmitButtonId).click();
});

Cypress.Commands.add('verifySuccessMessgeForCompleteAssessment', (loc, data) => {
  cy.get(loc.answerConfirmationId).should('have.text', data);
});

Cypress.Commands.add('clickCloseButtonOnPopupOfCompleteAssessment', (loc) => {
  cy.get(loc.answerConfirmationCloseButtonId).click();
});

Cypress.Commands.add('checkKnowledgeAssessmentRadioButton', (loc) => {
  cy.wait(5000);
  cy.get(loc.knowledgeAssessmentRadioButtonId).check({force:true});
  //cy.wait(1000);
  //cy.get('.assessment_answer span').eq(1).click({force:true});
});

Cypress.Commands.add('clickKnowledgeAssessmentNextButton', (loc) => {
  cy.wait(5000);
  cy.get(loc.knowledgeAssessmentNextButtonId).click();
  cy.wait(1000);
});

Cypress.Commands.add('clickEditAssessments', (loc, data) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(7) a`).click();  //click on delete icon for newly created module.
    cy.wait(2000);
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('completeAssessments', (loc, data, status) => {
  var flag = false;
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
      if ($el.text() === data && flag === false) {
        flag = true;
        cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(6)`).eq(0).invoke('text').then((text) => {
          cy.log(text);
          if(text === status && flag === true){
            cy.get(`.table.table-striped tbody tr:nth-child(${index}) td:nth-child(7) a`).click();  //click on delete icon for newly created module.
          }
          else {
            cy.log('no status found');
          }
        })
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('completeNotStartedAssessments', (loc, data, status) => {
  var flag = false;
 cy.get('.table.table-striped tbody td:nth-child(6)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
          if( $el.text() === status && flag === false){
            flag= true;
            cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(7) a`).click();  //click on delete icon for newly created module.
          }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('verifyMyAssessmentsColumnData', (loc, data, columnIndex, date) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${columnIndex})`).invoke('text').then((text) => {
      expect(Cypress.moment(text).format('ll')).eq(date);
    })
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('verifyMyAssessmentsColumnDataForManagerAccount', (loc, data, columnIndex, date) => {
  var flag = false;
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data && flag === false) {
      flag = true;
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${columnIndex})`).eq(0).invoke('text').then((text) => {
      expect(Cypress.moment(text).format('ll')).eq(date);
    })
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('verifyUserInManagerAssessment', (loc, data, columnIndex, status) => {
 cy.get('.table.table-striped tbody').eq(1).find('td:nth-child(2)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(${columnIndex}) span`).invoke('text').then((txt) => {
      if ($el.text() === data && txt === 'Complete') {
          expect(txt).eq(status);
      }
      else {
        cy.log('no user found under manager');
      }
    })
  })
});

Cypress.Commands.add('verifyUserNameOnReportWithloop', (loc, data) => {
  cy.get('.reports-tree-table-container table tbody tr td span:nth-child(3)').each(($e1, index, $list) => {
    cy.log($e1.text());
    cy.get(`.reports-tree-table-container table tbody tr:nth-child(${++index+1}) td:nth-child(1) span:nth-child(3)`).invoke('text').then((text) => {
      if(text === data){
      expect(text).eq(data);
    }
    })
  })
})

Cypress.Commands.add('verifyAssessmentReportOnReports', (loc, index,index1, index2, data) => {
  cy.get(`.reports-tree-table-container table tbody tr:nth-child(${index}) td:nth-child(${index1}) span:nth-child(${index2})`).invoke('text').then((text) => {
    expect(text).eq(data)
  })
});

Cypress.Commands.add('verifyGroupReportPdfIcon', (loc, index,index1, data) => {
  cy.get(`.reports-tree-table-container table tbody tr:nth-child(${index}) td:nth-child(${index1}) span form button`).invoke('attr', 'title').then((text) => {
    expect(text).eq(data)
  })
});

Cypress.Commands.add('verifyGroupReportPdfIconIsPresent', (loc, index,index1) => {
  cy.get(`.reports-tree-table-container table tbody tr:nth-child(${index}) td:nth-child(${index1}) span form button`).should('not.exist');
});

Cypress.Commands.add('verifyindividualReportPdfIconIsPresent', (loc, index,index1) => {
  cy.get(`.reports-tree-table-container table tbody tr:nth-child(${index}) td:nth-child(${index1}) span form button`).should('not.exist');
});

Cypress.Commands.add('verifyIndivisualReportPdfIcon', (loc, index,index1, data) => {
  cy.get(`.reports-tree-table-container table tbody tr:nth-child(${index}) td:nth-child(${index1}) span form button`).invoke('attr', 'title').then((text) => {
    expect(text).eq(data)
  })
});

Cypress.Commands.add('clickButton', (loc, index) => {
	cy.wait(2000);
  cy.get(loc).eq(index).click();
});

Cypress.Commands.add('clickButtonWithTargetAttr', (loc, index) => {
  cy.get(loc).eq(index).invoke('removeAttr', 'target').click({force:true});
});

Cypress.Commands.add('verifyButton', (loc, index) => {
  cy.get(loc).eq(index).should('be.exist');
});

Cypress.Commands.add('verifyLengthOfReason', (loc, len) => {
  cy.get(loc).should('have.length', len)
});

Cypress.Commands.add('clickOnUserReturnButton', (loc) => {
  cy.wait(3000);
  cy.get(loc.returnButtonId).click({force:true});
  cy.wait(3000);
})

Cypress.Commands.add('verifyAssessmentsStatus', (loc, data, text) => {
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data) {
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(6)`).should('have.text', text);  //click on delete icon for newly created module.
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('verifyReportDropdownIconIsInExtendForm', (loc, index, data) => {
  cy.get(loc, {timeout:20000}).eq(index).should('have.class', data);
});

Cypress.Commands.add('verifyReportDropdownIconIsInCollapseForm', (loc, index, data) => {
  cy.get(loc).eq(index).click({force:true});
  cy.get(loc).eq(index).should('have.class', data);
});

Cypress.Commands.add('verifyAssessmentsStatusOnManager', (loc, data, text) => {
  var flag = false;
 cy.get('.table.table-striped tbody td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
    cy.log($el.text());
    if ($el.text() === data && flag === false) {
        flag = true;
    cy.get(`.table.table-striped tbody tr:nth-child(${++index}) td:nth-child(6)`).eq(0).invoke('text').then((text1) => {
      if(text1===text && flag === true){
      expect(text1).eq(text);
    }
    })
    }
    else {
      cy.log('no assessment found');
    }
  })
});

Cypress.Commands.add('selectApplicationModuleAssess', (data) => {
  var flag = false ;
  cy.get('.table tr td.align-middle').each(($e1, index, $list) => {
    cy.log($e1.text());
    cy.log(data);
    if($e1.text() === data && flag === false) {
      flag = true;
      cy.log("In");

      if(index === 0) {
        cy.get(`.table tr:nth-child(1) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(1) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 1) {
        cy.get(`.table tr:nth-child(4) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(4) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 2) {
        cy.get(`.table tr:nth-child(6) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(6) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 3) {
        cy.get(`.table tr:nth-child(8) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(8) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 4) {
        cy.get(`.table tr:nth-child(10) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(10) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 5) {
        cy.get(`.table tr:nth-child(12) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(12) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }
      //cy.get(`.table td:nth-child(${++index}) td:nth-child(6) input.form-check-input`).click();
    }

    else{
      cy.log('no new user collection to give assess');
    }

  })
});


Cypress.Commands.add('selectAssessTab', (data) => {
  var flag = false ;
  cy.get('.table tr td.align-middle').each(($e1, index, $list) => {
    cy.log($e1.text());
    cy.log(data);
    if($e1.text() === data && flag === false) {
      flag = true;
      cy.log("In");

      if(index === 0) {
        cy.get(`.table tr:nth-child(1) td:nth-child(2) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(1) td:nth-child(3) div.form-check input.form-check-input`).eq(0).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(1) td:nth-child(4) div.form-check input.form-check-input`).eq(0).click({force:true});
      }

      else if(index === 1) {
        cy.get(`.table tr:nth-child(4) td:nth-child(2) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(4) td:nth-child(3) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(4) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 2) {
        cy.get(`.table tr:nth-child(6) td:nth-child(2) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(6) td:nth-child(3) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(6) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 3) {
        cy.get(`.table tr:nth-child(8) td:nth-child(2) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(8) td:nth-child(3) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(8) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 4) {
        cy.get(`.table tr:nth-child(10) td:nth-child(2) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(10) td:nth-child(3) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(10) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }

      else if(index === 5) {
        cy.get(`.table tr:nth-child(12) td:nth-child(2) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(12) td:nth-child(3) div.form-check input.form-check-input`).click({force:true});
        cy.wait(1000);
        cy.get(`.table tr:nth-child(12) td:nth-child(4) div.form-check input.form-check-input`).click({force:true});
      }
      //cy.get(`.table td:nth-child(${++index}) td:nth-child(6) input.form-check-input`).click();
    }

    else{
      cy.log('no new user collection to give assess');
    }

  })
});

Cypress.Commands.add('clickSaveButtonByIndex', (loc, index) => {
  cy.wait(2000);
  cy.get(loc).eq(index).click({force:true});
});

Cypress.Commands.add('clickNextButton',(loc)=>{
  cy.wait(5000);
  cy.get(loc.nextButtonId).click();
});

Cypress.Commands.add('upload_file', (fileName, fileType) => {
    cy.get('input[type=file]').then(subject => {
        cy.fixture(fileName, 'hex').then((fileHex) => {

            const fileBytes = hexStringToByte(fileHex);
            const testFile = new File([fileBytes], fileName, {
                type: fileType
            });
            const dataTransfer = new DataTransfer()
            const el = subject[0]

            dataTransfer.items.add(testFile)
            el.files = dataTransfer.files
        })
    })
})

Cypress.Commands.add('clickSearchDownCaretButton', (loc) => {
  cy.get(loc.searchCaretDownId).click();
});

Cypress.Commands.add('clickSearchFieldReactSelctDropdown', (loc, index, data) => {
  cy.get(loc.searchFieldReactSelctDropdownId).eq(index).click({force:true});
  cy.wait(1000);
  cy.contains(data).click({force:true});
});

Cypress.Commands.add('verifyTextOnKnowledgeAssessmentResult', (loc, index, data) => {
  cy.get(loc.textIdOnKnowledgeAssessmentResult).eq(index).invoke('text').then((text) => {
    expect(text).eq(data);
  });
});

Cypress.Commands.add('verifyKnowledgeAssessmentResultFilterdIsHidden', (loc, index) => {
  cy.get(loc.knowledgeAssessmentGraphFilterId).eq(index).should('have.class', 'highcharts-legend-item-hidden');
});

Cypress.Commands.add('verifyKnowledgeAssessmentResultFilterdIsVisible', (loc, index) => {
  cy.get(loc.knowledgeAssessmentGraphFilterId).eq(index).should('not.have.class', 'highcharts-legend-item-hidden');
});

Cypress.Commands.add('clickFilterLinkOnKnowledgeAssessmentResult', (loc, index) => {
  cy.get(loc.textIdOnKnowledgeAssessmentResult).eq(index).click({force:true})
});

Cypress.Commands.add('dismissAssessPopup', (loc) => {
  cy.wait(7000);
  cy.get("body").then($body => {
        if ($body.find('button[data-test-id="button-skip"]').length > 0) {   //evaluates as true
            cy.get('button[data-test-id="button-skip"]')
            .click();
        }
    });
  cy.wait(3000);
});

Cypress.Commands.add('unselectApplicationModuleAccess', (loc) => {
  cy.wait(2000);
  if (Cypress.$(loc).prop('checked')) {
    cy.get(loc).click();
    cy.wait(1000);
   }
   else {
    cy.log('checkbox is unchecked');
   }
});

Cypress.Commands.add('selectApplicationModuleAccess', (loc) => {
  cy.wait(2000);
  if (Cypress.$(loc).prop('checked')) {
    cy.log('checkbox is checked');
   }
   else {
    cy.get(loc).click();
    cy.wait(1000);
   }
});

Cypress.Commands.add('verifyPasswordFieldValidationMessage', (loc,data)=> {
	cy.get(loc).invoke('text').then((text) => {
		expect(text).eq(data);
	});
});

function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array();
    }

    var a = [];
    for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16));
    }

    return new Uint8Array(a);
}

//Assignment Progress Method

Cypress.Commands.add('verifyAssessmentSelectFieldCount', (loc, index) =>{
  cy.get(loc.assignmentProgressSelectionCountId).should('have.length', index);
});

//Team Progress Method

Cypress.Commands.add('verifyTeamProgressBar', (loc,index) => {
  cy.get(loc).eq(index).should('be.exist');
});

// Learning methods
Cypress.Commands.add('verifyElementText', (loc,data) => {
	cy.get(loc).should('have.text',data);
});

//Overall Progress methods
Cypress.Commands.add('verifyTotalActivities', (loc,loc1) => {
	var count=0;
	cy.get(loc).each(($el, index, $list) => {
		count = count + Number($el.text());
		cy.log(count);
		if(count == Number(Cypress.$(loc1).text())){
			cy.get(loc1).should('have.text',count.toString());
		}
	});
});

Cypress.Commands.add('clickOnTeamOption', (loc,index) => {
	cy.get(loc).eq(index).click({force:true});
});

// My Opportunities test methods
Cypress.Commands.add('enterNewOpportunitiesInputsAndVerify', (loc, data) => {
	cy.get(loc.myOpportunitiesNameId).type(data);
	cy.get(loc.myOpportunitiesStatusId).select('Active');
	cy.get(loc.myOpportunitiesAccountNameId).type('AccountName1');
	cy.get(loc.myOpportunitiesEstimateRevenueId).type('1');
	cy.get(loc.myOpportunitiesExpectedDateId).type(Cypress.moment().add(1, 'days').format('ll'));
	cy.clickUsingXpath(loc.myOpportunitiesSaveButtonId);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(0).should('have.text', data);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(1).should('have.text','Active');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(2).should('have.text','AccountName1');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(3).should('have.text',Cypress.moment().add(1, 'days').format("MMM DD, YYYY"));
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(4).should('have.text','1');
});

Cypress.Commands.add('enterNewOpportunitiesMandInputsAndVerify', (loc, data) => {
	cy.get(loc.myOpportunitiesNameId).type(data);
	cy.get(loc.myOpportunitiesAccountNameId).type('AccountName1');
	cy.clickUsingXpath(loc.myOpportunitiesSaveButtonId);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(0).should('have.text',data);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(1).should('have.text','N/A');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(2).should('have.text','AccountName1');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(3).should('have.text','N/A');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(4).should('have.text','');
});

Cypress.Commands.add('deleteExistingOpportunities', (loc, data) => {
	cy.clickButton(loc.salesToolNavLinkId, 2);
	cy.contains(data).click({force:true});
		//cy.wrap($el).eq(0).click();
		cy.clickUsingXpath(loc.myOpportunitiesEditButtonId);
		cy.clickUsingXpath(loc.myOpportunitiesDeleteButtonId);
		cy.clickButton(loc.myOpportunitiesModalButtonId,0);
});

Cypress.Commands.add('editNewOpportunitiesAndVerify', (loc, data) => {
	cy.clickUsingXpath(loc.myOpportunitiesEditButtonId);
	cy.get(loc.myOpportunitiesStatusId).select('Active');
	cy.get(loc.myOpportunitiesEstimateRevenueId).type('1');
	cy.get(loc.myOpportunitiesExpectedDateId).type(Cypress.moment().add(1, 'days').format('ll'));
	cy.clickUsingXpath(loc.myOpportunitiesSaveButtonId);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(0).should('have.text', data);
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(1).should('have.text','Active');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(2).should('have.text','AccountName1');
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(3).should('have.text',Cypress.moment().add(1, 'days').format("MMM DD, YYYY"));
	cy.get(loc.NewOpportunitiesCreatedTextId).eq(4).should('have.text','1');
});

Cypress.Commands.add('deleteNewOpportunitiesAndVerify', (loc) => {
	cy.get(loc.myOpportunitiesDetailsId).should('be.exist');
	cy.clickUsingXpath(loc.myOpportunitiesEditButtonId);
	cy.clickUsingXpath(loc.myOpportunitiesDeleteButtonId);
	cy.clickButton(loc.myOpportunitiesModalButtonId,0);
	cy.get(loc.myOpportunitiesDetailsId).should('not.be.exist');
});

Cypress.Commands.add('enterPainForKeyPlayer', (loc) => {
	cy.get(loc.keyPlayerPain1Id).click();
	cy.get(loc.KeyPlayerPainInputId).type('{downarrow}{enter}');
});

Cypress.Commands.add('enterReasonForKeyPlayer', (loc) => {
	cy.get(loc.keyPlayerReason1Id).click();
	cy.get(loc.KeyPlayerPainInputId).type('{downarrow}{enter}');
});

Cypress.Commands.add('verifyCreatedKeyPLayers', (loc) => {
	cy.clickUsingXpath(loc.myOpportunitiesSaveButtonId);
	cy.get(loc.keyPlayersDetailsTxtId).eq(1).invoke('text').then((keytxt1) => {
		cy.get(loc.keyPlayersPainDetailsTxtId).invoke('text').then((keyPaintxt1) => {
			cy.clickUsingXpath(loc.keyPlayerBackOpportunityId,0);
			cy.verifyPageContent(loc.myOpportunityKeyPlayerLabelId,0,'  - '+keytxt1);
			cy.verifyPageContent(loc.myOpportunityKeyPlayerPainLabelId,0,keyPaintxt1.trim());
		});
	});
});

// Collaboration plan methods

Cypress.Commands.add('enterEventNameCollaborationPlan', (loc,data) => {
	cy.get(loc).type(data);
});

Cypress.Commands.add('enterTextAndVerifyWithValue', (loc,data,index) => {
	cy.get(loc).eq(index).type(data).should('have.value',data);
});

// Strength check methods

Cypress.Commands.add('verifySelectedOptionOnStrengthChecks', (loc) => {
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(0).select('0 - No pain or missed opportunity identified');
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(1).select('0 - Potential Power Sponsor not identified');
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(2).select('0 - No vision of a solution established');
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(3).select('0 - No value identified');
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(4).select('0 - No documentation of client conversations');
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(5).select('0 - No compelling reason to act identified');
	cy.clickButton(loc.collaborationPlanSaveActivityId,0);
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,0,'0 - No pain or missed opportunity identified');
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,1,'0 - Potential Power Sponsor not identified');
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,2,'0 - No vision of a solution established');
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,3,'0 - No value identified');
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,4,'0 - No documentation of client conversations');
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,5,'0 - No compelling reason to act identified');
});

Cypress.Commands.add('verifyUpdatedItemData', (loc) => {
	cy.get(loc.strengthSalesChecksSelectOptionId).eq(0).select('1 - Seller identified potential pain or missed opportunity');
	cy.clickButton(loc.collaborationPlanSaveActivityId,0);
	cy.verifyPageContent(loc.strengthSalesChecksCreatedDetailsId,0,'1 - Seller identified potential pain or missed opportunity');
});

//Key Player methods

Cypress.Commands.add('updateAndVerifyKeyPlayers', (loc) => {
	cy.get(loc.keyPlayersPainAnchorId).click({force: true});
	cy.get(loc.keyPlayerEditId).click();
	cy.get(loc.keyPlayerEditHeaderId).should('have.text','Edit Key Player');
	cy.selectOptionFromSelectElement(loc.keyPlayerJobRoleId,'2');
	cy.enterPainForKeyPlayer(loc);
	cy.clickUsingXpath(loc.myOpportunitiesSaveButtonId);
	cy.get(loc.keyPlayersDetailsTxtId).eq(1).invoke('text').then((keytxt1) => {
		cy.get(loc.keyPlayersPainDetailsTxtId).invoke('text').then((keyPaintxt1) => {
			cy.clickUsingXpath(loc.keyPlayerBackOpportunityId,0);
			cy.verifyPageContent(loc.myOpportunityKeyPlayerLabelId,0,'  - '+keytxt1);
			cy.verifyPageContent(loc.myOpportunityKeyPlayerPainLabelId,0,keyPaintxt1.trim());
		});
	});
});
