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
import { AssessmentPeriodData} from '../../support/Base/PageData/AssessmentPeriodData.js';
import { AssessmentPeriodPage} from '../../support/Base/PageObjects/AssessmentPeriodObject.js';
import { UserCollectionData} from '../../support/Base/PageData/UserCollectionData.js';
import { UserCollectionPage} from '../../support/Base/PageObjects/UserCollectionObject.js';

const faker = require('faker');

describe('Behavior Assessment Test Cases', () => {
  const behaviorAssessmentName = 'behaviorAssessment'+faker.random.number();
  const invalidBehaviorAssessmentName = 'assessment'+faker.random.number();
  const updateBehaviorAssessmentName = 'updatedBehaviorAssessment'+faker.random.number();
  const userCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const dueDate = Cypress.moment().format('MM-DD-YYYY');
  const salesName = 'Sales'+faker.random.number();
  const AssessmentPeriodName = 'assessmentPeriod'+faker.random.number();
  const startDate = Cypress.moment().format('MM-DD-YYYY');
  const targetDate = Cypress.moment().format('MM-DD-YYYY');

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

  it('Should verify validation for search invalid Behaviour Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.enterUserSearchData(UserPage, invalidBehaviorAssessmentName);
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidBehaviorAssessmentName);
  });

  it('Should upadte the license and locked checkbox \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickOnEditButton(AccountPage);
    cy.enterLicensedValue(UserPage, '40');
    cy.uncheckCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });


  it('Should create new Behavior Assessment with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/behavior_assessments/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForAllBlankFieldInBehaviorAssessment);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should create new Behavior Assessment with only name in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/behavior_assessments/new');
    cy.enterBehaviorAssessmentName(AssessmentPage, behaviorAssessmentName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForBehaviorAssessmentOfOtherTwoRemainingField);
  });

  it('Should create a new Assessment Period in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Assessment Periods');
    cy.verifyUrl('/assessment_periods');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentPeriodData.assessmentPeriodTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/assessment_periods/new');
    cy.enterAssessmentPeriodName(AssessmentPeriodPage, AssessmentPeriodName);
    cy.enterAssessmentPeriod(AssessmentPeriodPage.assessmentPeriodStartDateId, startDate);
    cy.enterAssessmentPeriod(AssessmentPeriodPage.assessmentPeriodTargetDateId, targetDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewAssessmentPeriod(AssessmentPeriodPage, AssessmentPeriodData.successMessageForNewAssessmentPeriodText);
  });

  it('Should create new Behavior Assessment with assessment name and sales role in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/behavior_assessments/new');
    cy.enterBehaviorAssessmentName(AssessmentPage, behaviorAssessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForBehaviorAssessmentOfOtherOneRemainingField);
  });

  it('Should create new Behavior Assessment with assessment name, sales role and assessment period in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/behavior_assessments/new');
    cy.enterBehaviorAssessmentName(AssessmentPage, behaviorAssessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Inside Sales');
    cy.selectAssessmentDropdownValues(AssessmentPage,2,AssessmentPeriodName);
    cy.selectAssessmentDropdownValues(AssessmentPage,3,'en Acme: Demand Creation');
    cy.checkAllBehaviorQuestionCheckbox(AssessmentPage,0);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newBehaviorAssessmentSuccessMessage);
  });

  it('Should search created behavior Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.enterUserSearchData(UserPage, behaviorAssessmentName);
    cy.clickSearchIcon(AccountPage);
    cy.verifySearchResult(AccountPage);
    cy.verifySalesName(AccountPage.accountLink, behaviorAssessmentName);
  });

  it('Should cancel the edit created Behavior Assessment form in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(behaviorAssessmentName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.clickButtonOnKnowledgeAssessment(AssessmentPage.cancelButtonOnAssessmentId, 0);
    cy.verifyCancelButtonShouldNotVisible(AssessmentPage.cancelButtonOnAssessmentId);
  });

  it('Should edit created Behavior Assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(behaviorAssessmentName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.enterBehaviorAssessmentName(AssessmentPage, updateBehaviorAssessmentName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.upadtedBehaviorAssessmentSuccessMessage);
  });

  it('Should add Assessment user collection with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForAllBlankFieldInBehaviorAssessmentUserCollection);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  }); 

  it('Should create a new user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User Collections');
    cy.verifyUrl('/user_collections');
    cy.verifyPageTitle(AccountPage.accountTitleId, UserCollectionData.usercollectionTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/user_collections/new');
    cy.enterUserCollectionName(UserCollectionPage, userCollectionName);
    cy.enterUserCollectionDescription(UserCollectionPage, userCollectionDescription);
    cy.selectAllUserCollectionCheckboxs(UserCollectionPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewUserCollection(UserCollectionPage, UserCollectionData.successMessageForNewUserCollectionText);
    cy.clickUserCollectionButton(SalesPage, 2);
    cy.enterUserNameInAddUserPopupSearchField(SalesPage, 'Bill');
    cy.clickSearchButtonOnAddUserPopup(SalesPage);
    cy.selectCheckboxOnAddUserPopup(SalesPage);
    cy.clickAddSelectedUserButton(SalesPage);
    cy.verifySuccessMessageForAddSelectedUser(SalesPage);
  });

  it('Should add Behavior Assessment user collection with only User collection field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0, userCollectionName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForActiveAndDueDate);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should "Active Date" field disappear when user select "Make Active Now" for user collection of behavior assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.verifyActiveDateInUserCollectionIsVisible(AssessmentPage);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.verifyActiveDateInUserCollectionIsNotVisible(AssessmentPage);
  });

  it('Should add Assessment user collection with User collection field and "Make Active Now" checkbox in behavior assessment of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AssessmentData.validationMessageForDueDate);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should add Assessment user collection in behavior assessment of  \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.assessmentUserCollectionSuccessMessage);
  });

  it('Should edit Assessment user collection in behavior assessment of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnEditButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Outside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.updatedAssessmentUserCollectionSuccessMessage);
  });

  it('Should delete Assessment user collection in behavior assessment of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.deletedAssessmentUserCollectionSuccessMessage);
  });

  it('Should view the language under behavior tab of behavior assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickBehaviorAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
  });

  it('Should add new language in behavior assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickBehaviorAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'ja');
    cy.clickSaveButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId, AssessmentData.behaviorAssessmentItemSucessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyAddedLanguageInBehaviorTable(AssessmentPage, 'ja');
  });

  it('Should edit language in behavior assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickBehaviorAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickEditLanguageButtonBehaviorAssessment(AssessmentPage, 'ja');
    cy.selectAssessmentDropdownValues(AssessmentPage,1,'en Acme: Demand Creation');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.behaviorAssessmentItemSucessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.contains('en Acme: Demand Creation');
  });

  it('Should delete added language in behavior assessments in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.clickBehaviorAssessmentQuestionViewButton(AssessmentPage);
    cy.VerifyKnowledgeQuestionTextAfterClickOnViewButton(AssessmentPage, AssessmentData.knowledgeQuestionText);
    cy.clickEditLanguageButtonBehaviorAssessment(AssessmentPage, 'ja');
    cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.behaviorAssessmentItemDeleteSuccessMessage);
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyDeletedLanguageInBehaviorTable(AssessmentPage, 'ja');
  });

  it('Should delete behavior assessment in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.contains(updateBehaviorAssessmentName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.deleteBehaviorAssessmentSuccessMessage);
  });

  it('Should delete the created user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User Collections');
    cy.verifyUrl('/user_collections');
    cy.verifyPageTitle(AccountPage.accountTitleId, UserCollectionData.usercollectionTitleText);
    cy.enterUserSearchData(UserPage, userCollectionName);
    cy.clickSearchIcon(AccountPage);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, UserCollectionData.successMessageForDeleteNewUserCollectionText);
  });

  it('Should delete the created assessment period in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Assessment Periods');
    cy.verifyUrl('/assessment_periods');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentPeriodData.assessmentPeriodTitleText);
    cy.contains(AssessmentPeriodName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentPeriodData.successMessageForDeleteNewAssessmentPeriodText);
  });

  it('Should upadte the license and locked checkbox \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickOnEditButton(AccountPage);
    cy.enterLicensedValue(UserPage, '40');
    cy.checkedAccountLockCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });
});
