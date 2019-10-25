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
import { LearningData} from '../../support/Base/PageData/LearningData.js';
import { LearningPage} from '../../support/Base/PageObjects/LearningObject.js';
import { UserCollectionData} from '../../support/Base/PageData/UserCollectionData.js';
import { UserCollectionPage} from '../../support/Base/PageObjects/UserCollectionObject.js';

const faker = require('faker');

describe('Learning Activity Test Cases', () => {
  const learningActivityName = 'learningActivity'+faker.random.number();
  const invalidLearningActivityName = 'learningActivity'+faker.random.number();
  const userCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const salesName = 'Sales'+faker.random.number();
  const password = 'Testing@123';
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const viewTemplateText = 'Design your template here';
  const relativeOrder = faker.random.number();
  const Date = Cypress.moment().format('MM-DD-YYYY');

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

  it('Should verify validation for invalid Learning Activities search in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.enterUserSearchData(UserPage, invalidLearningActivityName);
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidLearningActivityName);
  });

  it('Should create a new learning activity in \'Acme\' account with all blank field', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_statuses/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.learningActivityValidationMessageForAllBlankField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
  });

  it('Should create a new learning activity without user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_statuses/new');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityCourseFieldId, 'Ilt course (ILT)');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.learningActivityAssignFieldValidation);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should create a new learning activity without course in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_statuses/new');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityUserFieldId, 'Chuck Justice');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.learningActivityCourseFieldValidation);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
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
    cy.selectTemplateDropdownValue(SalesPage,'Inside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForNewSales);
  });

  it('Should create a new user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/users/new');
    cy.selectDropdownValue(UserPage, 0, 'User');
    cy.selectDropdownValue(UserPage, 1, 'Active');
    cy.enterUserFirstName(UserPage, firstName);
    cy.enterUserLastName(UserPage, lastName);
    cy.enterUserEmail(UserPage, emailAddress);
    cy.selectDropdownValue(UserPage, 2, 'Bill Jenkins');
    cy.selectMultipleDropdownValue(UserPage, 3, userCollectionName);
    cy.selectMultipleDropdownValue(UserPage, 4, salesName);
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'English');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
  });

  it('Should create a new learning activity in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_statuses/new');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityCourseFieldId, 'Ilt course (ILT)');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityUserFieldId, firstName +' '+ lastName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearningActivity);
  });

  it('Should edit the learning activity with start date, Submitted Date, End Date and score', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickViewButtonOfLearningActivity(LearningPage, firstName +' '+ lastName, 8);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Course: Ilt course');
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.enterLearningData(LearningPage.learningActivityStartDateId, Date);
    cy.enterLearningData(LearningPage.learningActivitySubmittedDateId, Date);
    cy.enterLearningData(LearningPage.learningActivityEndDateId, Date);
    cy.enterLearningData(LearningPage.learningActivityScopeFieldId, '85');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
  });

  it('Should Verify the learning activity default status', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'open');
  });

  it('Should user change the learning activity status as strated', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickViewButtonOfLearningActivity(LearningPage, firstName +' '+ lastName, 8);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Course: Ilt course');
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'started');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'started');
  });

  it('Should user change the learning activity status as complete', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickViewButtonOfLearningActivity(LearningPage, firstName +' '+ lastName, 8);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Course: Ilt course');
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'complete');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'complete');
  });

  it('Should user change the learning activity status as submitted', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickViewButtonOfLearningActivity(LearningPage, firstName +' '+ lastName, 8);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Course: Ilt course');
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'submitted');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'submitted');
  });

  it('Should user change the learning activity status as returned', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickViewButtonOfLearningActivity(LearningPage, firstName +' '+ lastName, 8);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Course: Ilt course');
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'returned');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'returned');
  });

  it('Should delete selected learning activity', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickCheckboxOfLearningActivity(LearningPage, firstName +' '+ lastName, 1);
    cy.clickDeleteSelectedButtonForLearningActivity(LearningPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForDeleteLearningActivity);
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

  it('Should delete the created user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, emailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userDeleteSuccessMessage);
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
