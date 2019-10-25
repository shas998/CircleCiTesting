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

describe('Learning Test Cases', () => {
  const learningName = 'learningPlan'+faker.random.number();
  const invalidLearningName = 'learningPlan'+faker.random.number();
  const viewTemplateText = 'Design your template here';
  const relativeOrder = faker.random.number();
  const dueDate = Cypress.moment().format('MM-DD-YYYY');
  const futureDueDate = Cypress.moment().add(1, 'months').format('MM-DD-YYYY');
  const userCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const salesName = 'Sales'+faker.random.number();
  const password = 'Testing@123';
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();

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
    cy.selectCompetencyCheckbox(SalesPage, 0);
    cy.selectStrategicCheckbox(SalesPage, 0);
    cy.selectCompetencyCheckbox(SalesPage, 1);
    cy.selectStrategicCheckbox(SalesPage, 1);
    cy.selectCompetencyCheckbox(SalesPage, 2);
    cy.selectStrategicCheckbox(SalesPage, 2);
    cy.selectCompetencyCheckbox(SalesPage, 3);
    cy.selectStrategicCheckbox(SalesPage, 3);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForEditUSales);
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

  it('Should verify validation for invalid Learning Plan search in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.enterUserSearchData(UserPage, invalidLearningName);
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidLearningName);
  });

  it('Should create a new Learning Plan with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/learning_plans/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.learningPlanValidationMessageForAllBlankField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
  });

  it('Should create a new Learning Plan with only name in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/learning_plans/new');
    cy.enterLearningPlanName(LearningPage, learningName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.learningPlanValidationMessageForBlankSaleField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should create a new Learning Plan with name and sales role in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/learning_plans/new');
    cy.enterLearningPlanName(LearningPage, learningName);
    cy.selectLearningSalesRoleDropdownValue(LearningPage, salesName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearning);
    cy.contains(learningName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForDeleteLearning);
  });

  it('Should create a new Learning Plan with Learning Plan Items in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/learning_plans/new');
    cy.enterLearningPlanName(LearningPage, learningName);
    cy.selectLearningSalesRoleDropdownValue(LearningPage, salesName);
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 0, 'en Acme: Demand Creation');
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 1, 'foundational');
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 2, 'Learn');
    cy.wait(2000);
    cy.selectAllCheckboxLearningPlanItems(LearningPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearning);
  });

  it('Should add new user collection in learning plan with all blank field', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.allBlankFieldValidationMessageForNewLearningUserCollection);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 2);
  });

  it('Should add new user collection in learning plan with only user collection option', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.activeAndDueDateValidationMessageForNewLearningUserCollection);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
  });

  it('Should "Active Date" field disappear when user select "Make Active Now" for new user collection in learning plan', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName/*'Inside Sales'*/);
    cy.verifyActiveDateInNewLearningUserCollectionIsVisible(LearningPage);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.verifyActiveDateInNewLearningUserCollectionIsNotVisible(LearningPage);
  });

  it('Should add new user collection in learning plan with user collection option and active date', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName/*'Inside Sales'*/);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.dueDateValidationMessageForNewLearningUserCollection);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should add new user collection in learning plan with user collection option , active date and due date(same as active date)', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName/*'Inside Sales'*/);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterNewLearningUserCollectionDueDate(LearningPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageWhenActiveDateIsGreaterThanDue);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,LearningData.invalidFeedbackMessageWhenActiveDateIsGreaterThanDue, 0);
  });

  it('Should add new user collection in learning plan with user collection option , active date and due date', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName/*'Inside Sales'*/);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterNewLearningUserCollectionDueDate(LearningPage, futureDueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearningUserCollection);
  });

  it('Should verify added user collection in learning plan in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.verifyValueInLearningPlanTable(LearningPage, 4, learningName, userCollectionName/*'Inside Sales'*/);
  });

  it('Should verify the learning plan in user', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 6, 'Not Started', 'Demand Creation Best Practices');
  });

  it('Should user change the learning activity status as started', () => {
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
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'started');
    cy.enterLearningData(LearningPage.learningActivityStartDateId, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'started');
  });

  it('Should verify status of learning activity in user when activity is started', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 6, 'In Progress', 'Demand Creation Best Practices');
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
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'complete');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'complete');
  });

  it('Should verify status of learning activity in user when activity is complete', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 6, 'Complete', 'Demand Creation Best Practices');
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
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'submitted');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'submitted');
  });

  it('Should verify status of learning activity in user when activity is Submitted', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 6, 'Submitted', 'Demand Creation Best Practices');
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
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.selectLearningActivityFieldOption(LearningPage.learningActivityStatusId, 'returned');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
    cy.verifyLearningActivityStatus(LearningPage, firstName +' '+ lastName, 7, 'returned');
  });

  it('Should verify status of learning activity in user when activity is returned', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 6, 'Returned', 'Demand Creation Best Practices');
  });

  it('Should add score learning activity in user', () => {
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
    cy.clickOnEditButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId, 'Edit Learning Activity');
    cy.enterLearningData(LearningPage.learningActivityScopeFieldId, '85');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearningActivity);
  });

  it('Should verify score of learning activity in user', () => {
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
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 1);
    cy.verifyLearningPlanNameInUserList(LearningPage, learningName, 7, '85', 'Demand Creation Best Practices');
  });

  it('Should added relative order in learning plan in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.enterRelativeOrder(LearningPage, relativeOrder);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearning);
    cy.verifyValueInLearningPlanTable(LearningPage, 2, learningName, relativeOrder);
  });

  it('Should Add view template text in learning plan', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.clickLearningPlanCollapseArrow(LearningPage, 0);
    cy.wait(2000);
    cy.get('#learning_plan_notification_text').invoke('removeAttr','style').type("Hello HTML");
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearning);
  });

  it('Should verify the competency list for existing user collection in \'Learning Plan Competencies\' section', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.clickLearningPlanCollapseArrow(LearningPage, 1);
    cy.verifyLearningCompetenciesList(LearningPage, 4);
  });

  it('Should add new competency in list for existing user collection in \'Learning Plan Competencies\' section', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.clickLearningPlanCollapseArrow(LearningPage, 1);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyLearningCompetencyModelText(LearningPage, LearningData.learningCompetencyModelText)
    cy.selectLearningCompetenciesCheckbox(LearningPage, 0);
    cy.clickOnLearningCompetenciesModelButton(LearningPage);
    cy.verifyLearningCompetenciesList(LearningPage, 5);
    cy.selectAddedLearningCompetenciesInList(LearningPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForEditLearning);
  });

  it('Should edit new user collection in learning plan', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewLearningUserCollectionLinkInTable(LearningPage, 0);
    cy.clickOnEditButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,'Outside Sales');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.updatedNewLearningUserCollectionSuccessMessage);
  });

  it('Should delete new learnig user collection', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewLearningUserCollectionLinkInTable(LearningPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForDeleteNewLearningUserCollection);
  });


  it('Should delete the learning plan in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForDeleteLearning);
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
