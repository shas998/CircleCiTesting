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

describe('User Collection Test Cases', () => {
  const invalidUserCollectionName = 'userCollection'+faker.random.number();
  const userCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const AssessmentPeriodName = 'assessmentPeriod'+faker.random.number();
  const startDate = Cypress.moment().format('MM-DD-YYYY');
  const targetDate = Cypress.moment().format('MM-DD-YYYY');
  const salesName = 'Sales'+faker.random.number();
  const assessmentName = 'assessment'+faker.random.number();
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

  it('Should search a user collection with invalid value in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User Collections');
    cy.verifyUrl('/user_collections');
    cy.verifyPageTitle(AccountPage.accountTitleId, UserCollectionData.usercollectionTitleText);
    cy.enterUserSearchData(UserPage, invalidUserCollectionName); //input data in search field
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidUserCollectionName);
  });

  it('Should verify validation message when user create new user collection with blank name in \'Acme\' account', () => {
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
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,UserCollectionData.validationMessageForBlankNameField);
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
  });

  it('Should add new user for creates user collection in \'Acme\' account', () => {
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
    cy.clickUserCollectionButton(SalesPage, 2);
    cy.enterUserNameInAddUserPopupSearchField(SalesPage, 'Bill');
    cy.clickSearchButtonOnAddUserPopup(SalesPage);
    cy.selectCheckboxOnAddUserPopup(SalesPage);
    cy.clickAddSelectedUserButton(SalesPage);
    cy.verifySuccessMessageForAddSelectedUser(SalesPage);
  });

  it('Should verify assessmet not available message in user collection of \'Acme\' account', () => {
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
    cy.verifyMessage(UserCollectionPage.userCollectionAssessmentTextId, UserCollectionData.userCollectionAssessmentText);
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

  it('Should create new sales role in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/sales_roles/new');
    cy.enterSalesName(SalesPage, salesName);
    //cy.selectTemplateDropdownValue(SalesPage,'Inside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForNewSales);
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
    cy.selectAssessmentDropdownValues(AssessmentPage,0, salesName);
    cy.selectAssessmentDropdownValues(AssessmentPage,2, AssessmentPeriodName);
    //cy.selectAssessmentDropdownValues(AssessmentPage,3,'en Acme: Demand Creation');
    //cy.checkAllKnowledgeQuestionCheckbox(AssessmentPage,0);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newAssessmentSuccessMessage);
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
  });

  it('Should verify assessment name , active date, due date and active sign in user collection of \'Acme\' account', () => {
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
    cy.verifyAssessmentNameInAssessmentTable(UserCollectionPage.assessmentNameOnUserCollectionId, assessmentName);
    cy.verifyContentInAssessmentTable(UserCollectionPage.assessmentActiveDateOnUserCollectionId, Cypress.moment().format('DD-MMM-YY'));
    cy.verifyContentInAssessmentTable(UserCollectionPage.assessmentDueDateOnUserCollectionId, Cypress.moment().format('DD-MMM-YY'));
    cy.verifyActiveStatusInAssessmentTable(UserCollectionPage.assessmentActiveStatusOnUserCollectionId, 'true');
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
    cy.contains(assessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.deletedAssessmentUserCollectionSuccessMessage);
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
    cy.contains(assessmentName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.deleteAssessmentSuccessMessage);
  });

  it('Should delete created the sales role in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.enterUserSearchData(UserPage, salesName); //input data in search field
    cy.clickSearchIcon(AccountPage);
    cy.verifySearchResult(AccountPage);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForDeleteSales);
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