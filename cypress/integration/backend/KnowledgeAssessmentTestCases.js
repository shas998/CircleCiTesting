import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';
import { SalesData} from '../../support/Base/PageData/SalesData.js';
import { SalesPage} from '../../support/Base/PageObjects/SalesObject.js';
import { AssessmentData} from '../../support/Base/PageData/AssessmentData.js';
import { AssessmentPage} from '../../support/Base/PageObjects/AssessmentObject.js';

const faker = require('faker');

describe('Knowledge Assessment Test Cases', () => {
  const assessmentName = 'assessment'+faker.random.number();
  const invalidAssessmentName = 'assessment'+faker.random.number();
  const updatedAssessmentName = 'assessment'+faker.random.number();
  const metricName = 'Metric'+faker.random.number();
  const updatedMetricName = 'Metric'+faker.random.number();
  const dueDate = Cypress.moment().format('MM-DD-YYYY');

  beforeEach(() => {
  // first thing that happens before tests
  cy.visit({
            url: '',
            headers: {
                'X-SPI-CYPRESS-CLIENT-KEY': 'e0c22c40139bc34dafcbfa7ae4aa1ebf'
            },
            followRedirect: true,
        })
  cy.enterEmail(LoginPage,LoginData.email);
  cy.enterPassword(LoginPage,LoginData.password);
  cy.loginButton(LoginPage);
});

  afterEach(() => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
});

  it('Should verify validation for search invalid Knowledge Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.enterUserSearchData(UserPage, invalidAssessmentName);
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidAssessmentName);
  });

  it('Should upadte the license and locked checkbox \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickOnEditButton(AccountPage);
    cy.uncheckCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });


  it('Should create new Knowledge Assessment with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/knowledge_assessments/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForAllBlankFieldInAssessment);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should create new Knowledge Assessment with only assessment name in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/knowledge_assessments/new');
    cy.enterAssessmentName(AssessmentPage, assessmentName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForOtherTwoRemainingField);
  });

  it('Should create new Knowledge Assessment with assessment name and sales role in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/knowledge_assessments/new');
    cy.enterAssessmentName(AssessmentPage, assessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForOtherOneRemainingField);
  });

  it('Should create new Knowledge Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/knowledge_assessments/new');
    cy.enterAssessmentName(AssessmentPage, assessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.selectAssessmentDropdownValues(AssessmentPage,2,'Q1 Assessment Period');
    cy.selectAssessmentDropdownValues(AssessmentPage,3,'en Acme: Demand Creation');
    cy.checkAllKnowledgeQuestionCheckbox(AssessmentPage,0);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newAssessmentSuccessMessage);
  });

  it('Should search created Knowledge Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.enterUserSearchData(UserPage, assessmentName);
    cy.clickSearchIcon(AccountPage);
    cy.verifySearchResult(AccountPage);
    cy.verifySalesName(AccountPage.accountLink, assessmentName);
  });

  it('Should cancel the edit created Knowledge Assessment form in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(assessmentName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.clickButtonOnKnowledgeAssessment(AssessmentPage.cancelButtonOnAssessmentId, 0);
    cy.verifyCancelButtonShouldNotVisible(AssessmentPage.cancelButtonOnAssessmentId);
  });

  it('Should edit created Knowledge Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(assessmentName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.enterAssessmentName(AssessmentPage, updatedAssessmentName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.upadtedAssessmentSuccessMessage);
  });

  it('Should add Assessment user collection with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForAllBlankFieldInAssessmentUserCollection);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  }); 

  it('Should add Assessment user collection with only User collection field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForActiveAndDueDate);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  }); 

  it('Should "Active Date" field disappear when user select "Make Active Now" for user collection of assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.verifyActiveDateInUserCollectionIsVisible(AssessmentPage);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.verifyActiveDateInUserCollectionIsNotVisible(AssessmentPage);
  }); 

  it('Should add Assessment user collection with User collection and active date field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForDueDate);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should add Assessment user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.assessmentUserCollectionSuccessMessage);
  }); 

  it('Should edit Assessment user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnEditButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Outside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.updatedAssessmentUserCollectionSuccessMessage);
  });

  it('Should delete Assessment user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.deletedAssessmentUserCollectionSuccessMessage);
  });

  it('Should view question of knowledge assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickKnowledgeAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
  });

  it('Should add new language in question assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickKnowledgeAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'ja');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.assessmentItemSucessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.contains(updatedAssessmentName).click();
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyAddedLanguageInQuestionTable(AssessmentPage, 'ja');
  });

  it('Should edit language in question assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickKnowledgeAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickEditLanguageButton(AssessmentPage, 'ja');
    cy.selectAssessmentDropdownValues(AssessmentPage,1,'en Acme: Demand Creation');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.assessmentItemSucessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.contains('en Acme: Demand Creation');
  });

  it('Should delete added language in question assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickKnowledgeAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickEditLanguageButton(AssessmentPage, 'ja');
    cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.assessmentItemDeleteSuccessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyDeletedLanguageInQuestionTable(AssessmentPage, 'ja');
  });


  it('Should export knowledge assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click();
    cy.exportKnowledge(AssessmentPage, 4, '/export');
  });

  it('Should delete knowledge assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(updatedAssessmentName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.deleteAssessmentSuccessMessage);
  });

  it('Should upadte the license and locked checkbox \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickOnEditButton(AccountPage);
    cy.checkedAccountLockCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });
});
