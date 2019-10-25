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

describe('Happy Path Flow Test Cases', () => {
  const assessmentName = 'assessment'+faker.random.number();
  const emailAddress = faker.internet.email();
  const salesName = 'Sales'+faker.random.number();
  const password = 'Testing@123'
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const updatedAssessmentName = 'assessment'+faker.random.number();
  const metricName = 'Metric'+faker.random.number();
  const updatedMetricName = 'Metric'+faker.random.number();
  const dueDate = Cypress.moment().format('MM-DD-YYYY');
  const userCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const AssessmentPeriodName = 'assessmentPeriod'+faker.random.number();
  const startDate = Cypress.moment().format('MM-DD-YYYY');
  const targetDate = Cypress.moment().format('MM-DD-YYYY');
  const behaviorAssessmentName = 'behaviorAssessment'+faker.random.number();

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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should add an Application Module Access to new user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.selectApplicationModuleAssess(userCollectionName);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should add an Access Tab to new user collection in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectAssessTab(userCollectionName);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.selectAssessmentDropdownValues(AssessmentPage,2, AssessmentPeriodName);
    cy.selectAssessmentDropdownValues(AssessmentPage,3,'en Acme: Demand Creation');
    cy.checkAllKnowledgeQuestionCheckbox(AssessmentPage,0);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newAssessmentSuccessMessage);
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create new behavior Assessment in \'Acme\' account', () => {
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
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'English');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and verify the due date for my assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 3, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 3, Cypress.moment().format('ll'));
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and check the status for incomplete behavior assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Behavior');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyAssessmentsStatus(UserPage,'Behavior','In Progress');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and check the status for incomplete Knowledge assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Knowledge');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyAssessmentsStatus(UserPage,'Knowledge','In Progress');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and verify the start date for my assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 4, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 4, Cypress.moment().format('ll'));
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and complete the knowledge assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Knowledge');
    cy.clickNextButton(UserPage);
    cy.checkKnowledgeAssessmentRadioButton(UserPage);
    cy.clickKnowledgeAssessmentNextButton(UserPage); // submit button
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.verifyAssessmentsStatus(UserPage,'Knowledge','Complete');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and complete the behavior assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Behavior');
    cy.clickNextButton(UserPage);
    cy.checkAllRadioButtonOfAnswer(UserPage);
    cy.clickOnSubmitButtonToCompleteAssessment(UserPage);
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.verifyAssessmentsStatus(UserPage,'Behavior','Complete');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and verify the complete date for my assessment', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 5, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 5, Cypress.moment().format('ll'));
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify the assigned assessment under assessment tab on user page', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 0);
    cy.verifyAssignedAssessmentRow(UserPage, 2);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify the assigned assessment pdf icon under assessment tab on user page', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 0);
    cy.verifyAssessmentPdfFile(UserPage, 2);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });


  it('Should verify user under manager with assessment status', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, 'bill.jenkins@acme.com'); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, 'bill.jenkins@acme.com');
    cy.dismissAssessPopup(UserPage);
    cy.verifyUserInManagerAssessment(UserPage,firstName +' '+ lastName, 7, 'Complete');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should user can login as user and then verify the strategic page content', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyTextOnStrategicPage(firstName +' '+ lastName);
    cy.verifyTextOnStrategicPage('Bill Jenkins');
    cy.verifyTextOnStrategicPage('Inside Sales'/*salesName*/);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify user first name and role avg. in knowledge assessment result on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyTextOnKnowledgeAssessmentResult(UserPage, 0, 'Team');
    cy.verifyTextOnKnowledgeAssessmentResult(UserPage, 1, 'Company Avg');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify competency name in knowledge assessment result on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyMessage(UserPage.competencyNameIdOnKnowledgeAssessmentResult, 'Demand Creation');
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should Filter the knowledge assessment graph with user first name on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.clickFilterLinkOnKnowledgeAssessmentResult(UserPage, 0);
    cy.verifyKnowledgeAssessmentResultFilterdIsHidden(UserPage, 0);
    cy.clickFilterLinkOnKnowledgeAssessmentResult(UserPage, 1);
    cy.verifyKnowledgeAssessmentResultFilterdIsHidden(UserPage, 1);
    cy.clickFilterLinkOnKnowledgeAssessmentResult(UserPage, 0);
    cy.verifyKnowledgeAssessmentResultFilterdIsVisible(UserPage, 0);
    cy.clickFilterLinkOnKnowledgeAssessmentResult(UserPage, 1);
    cy.verifyKnowledgeAssessmentResultFilterdIsVisible(UserPage, 1);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify the assessment peroid on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyAssessmentPeriodFieldOnStrategicPage(UserPage, AssessmentPeriodName);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify knowledge assessment result with one single sales role on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyCollapseFieldCount(UserPage, 2);
    cy.selectDropDownValues(UserPage, 0, 'Inside Sales', UserPage.salesRoleInputReactSelect);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify knowledge assessment result with one user collection on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyCollapseFieldCount(UserPage, 2);
    cy.selectDropDownValues(UserPage, 1, userCollectionName, UserPage.userCollectionInputReactSelect);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should verify knowledge assessment result with user collection and sales role on strategic page', () => {
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
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Strategic');
    cy.verifyLoginAsUserInTopStripe(UserPage, emailAddress);
    cy.verifyCollapseFieldCount(UserPage, 2);
    cy.selectDropDownValues(UserPage, 0, 'Inside Sales', UserPage.salesRoleInputReactSelect);
    cy.selectDropDownValues(UserPage, 1, userCollectionName, UserPage.userCollectionInputReactSelect);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickOnUserReturnButton(UserPage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete Assessment user collection in knowledge assessment of \'Acme\' account', () => {
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.contains(behaviorAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.deletedAssessmentUserCollectionSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.contains(behaviorAssessmentName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.deleteBehaviorAssessmentSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.clickOnEditButton(AccountPage);
    cy.unselectMultipleDropdownValue(UserPage, 1, userCollectionName);
    cy.clickSaveButton(AccountPage);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userDeleteSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
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
    cy.checkedAccountLockCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });
});
