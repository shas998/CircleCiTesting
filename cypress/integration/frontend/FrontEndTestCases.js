import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';
import { UserCollectionData} from '../../support/Base/PageData/UserCollectionData.js';
import { UserCollectionPage} from '../../support/Base/PageObjects/UserCollectionObject.js';
import { SalesData} from '../../support/Base/PageData/SalesData.js';
import { SalesPage} from '../../support/Base/PageObjects/SalesObject.js';
import { BusinessData} from '../../support/Base/PageData/BusinessData.js';
import { BusinessPage} from '../../support/Base/PageObjects/BusinessUnitObject.js';
import { TerritorData} from '../../support/Base/PageData/TerritoriesData.js';
import { TerritorPage} from '../../support/Base/PageObjects/TerritoriesObject.js';
import { AssessmentPeriodData} from '../../support/Base/PageData/AssessmentPeriodData.js';
import { AssessmentPeriodPage} from '../../support/Base/PageObjects/AssessmentPeriodObject.js';
import { AssessmentData} from '../../support/Base/PageData/AssessmentData.js';
import { AssessmentPage} from '../../support/Base/PageObjects/AssessmentObject.js';
import { LearningData} from '../../support/Base/PageData/LearningData.js';
import { LearningPage} from '../../support/Base/PageObjects/LearningObject.js';
const faker = require('faker');

describe('FrontEnd Test Cases', () => {

  const learningName = 'learningPlan'+faker.random.number();
  const userCollectionName = 'userCollection'+faker.random.number();
  const secondUserCollectionName = 'userCollection'+faker.random.number();
  const userCollectionDescription = 'Spi new user collection description';
  const salesName = 'Sales'+faker.random.number();
  const secondSalesName = 'Sales'+faker.random.number();
  const metricName = 'Metric'+faker.random.number();
  const secondMetricName = 'secondMetric'+faker.random.number();
  const businessUnitName = "Business_Unit" +faker.random.number();
  const territorName = "Territory" +faker.random.number();
  const AssessmentPeriodName = 'assessmentPeriod'+faker.random.number();
  const startDate = Cypress.moment().format('MM-DD-YYYY');
  const targetDate = Cypress.moment().format('MM-DD-YYYY');
  const behaviorAssessmentName = 'behaviorAssessment'+faker.random.number();
  const knowledgeAssessmentName = 'knowledgeAssessment'+faker.random.number();
  const futureDueDate = Cypress.moment().add(1, 'months').format('MM-DD-YYYY');
  const dueDate = Cypress.moment().format('MM-DD-YYYY');
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const secondUserfirstName = faker.name.firstName();
  const secondUserlastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const emailAddressSecondUser = faker.internet.email();
  const password = 'Testing@123';
  const parentBusinessUnitName = "Parent_Business_Unit" +faker.random.number();
  const opportunityName = faker.internet.userName();

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

  it('Should update the license and locked checkbox \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickOnEditButton(AccountPage);
    cy.enterLicensedValue(UserPage, '40');
    cy.uncheckCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });

  it('Should create a new user collection in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create a second user collection in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User Collections');
    cy.verifyUrl('/user_collections');
    cy.verifyPageTitle(AccountPage.accountTitleId, UserCollectionData.usercollectionTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/user_collections/new');
    cy.enterUserCollectionName(UserCollectionPage, secondUserCollectionName);
    cy.enterUserCollectionDescription(UserCollectionPage, userCollectionDescription);
    cy.selectAllUserCollectionCheckboxs(UserCollectionPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewUserCollection(UserCollectionPage, UserCollectionData.successMessageForNewUserCollectionText);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create new sales role in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/sales_roles/new');
    cy.enterSalesName(SalesPage, salesName);
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
    cy.clickGrowthAlignedGoalDropdownIconByIndex(SalesPage,0);
    cy.clickGrowthAlignedGoalNewButtonByIndex(SalesPage, 0);
    cy.verifyGrowthAlignedGoalPopupText(SalesPage,SalesData.growthAlignedGoalPopupText);
    cy.selectMetricOption(SalesPage, '# of Opportunities');
    cy.enterMetricDisplayName(SalesPage, metricName);
    cy.enterGoalValue(SalesPage, '25');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricNameInTableBylist(SalesPage, metricName);
    cy.clickGrowthAlignedGoalNewButtonByIndex(SalesPage, 0);
    cy.verifyGrowthAlignedGoalPopupText(SalesPage,SalesData.growthAlignedGoalPopupText);
    cy.selectMetricOption(SalesPage, 'Sales Cycle Length');
    cy.enterMetricDisplayName(SalesPage, secondMetricName);
    cy.enterGoalValue(SalesPage, '15');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricNameInTableBylist(SalesPage, secondMetricName);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create second sales role in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/sales_roles/new');
    cy.enterSalesName(SalesPage, secondSalesName);
    cy.clickSaveButton(AccountPage);
    cy.selectCompetencyCheckbox(SalesPage, 0);
    cy.selectStrategicCheckbox(SalesPage, 0);
    cy.selectCompetencyCheckbox(SalesPage, 1);
    cy.selectStrategicCheckbox(SalesPage, 1);
    cy.selectCompetencyCheckbox(SalesPage, 2);
    cy.selectStrategicCheckbox(SalesPage, 2);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForEditUSales);
    cy.clickGrowthAlignedGoalDropdownIconByIndex(SalesPage,0);
    cy.clickGrowthAlignedGoalNewButtonByIndex(SalesPage, 0);
    cy.verifyGrowthAlignedGoalPopupText(SalesPage,SalesData.growthAlignedGoalPopupText);
    cy.selectMetricOption(SalesPage, '# of Opportunities');
    cy.enterMetricDisplayName(SalesPage, metricName);
    cy.enterGoalValue(SalesPage, '25');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricNameInTableBylist(SalesPage, metricName);
    cy.clickGrowthAlignedGoalNewButtonByIndex(SalesPage, 0);
    cy.verifyGrowthAlignedGoalPopupText(SalesPage,SalesData.growthAlignedGoalPopupText);
    cy.selectMetricOption(SalesPage, 'Sales Cycle Length');
    cy.enterMetricDisplayName(SalesPage, secondMetricName);
    cy.enterGoalValue(SalesPage, '15');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricNameInTableBylist(SalesPage, secondMetricName);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should Create a new business in \'LearnCo\' account', () => {
   cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
   cy.clickSearchIcon(AccountPage); // click on search searchIcon
   cy.verifySearchResult(AccountPage); // Verify the result for specific account
   cy.openAccountUsingLink(AccountPage,0); // click on account link by index
   cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
   cy.clickDropdown(UserPage, 1);
   cy.clickDropdownMenuItem(UserPage,'Business Unit');
   cy.verifyUrl('/business_units');
   cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
   cy.deleteExistingBusinessUnit(BusinessPage); // deletion of existing business unit
   cy.clickNewButton(AccountPage); // click on New button
   cy.verifyUrl('/business_units/new');
   cy.enterBusinessUnitName(BusinessPage, parentBusinessUnitName);
   cy.clickSaveButton(AccountPage);
   cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForNewBusiness);
   cy.clickNewButton(AccountPage); // click on New button
   cy.verifyUrl('/business_units/new');
   cy.enterBusinessUnitName(BusinessPage, businessUnitName);
   cy.selectBusinessUnitParentDropdownValue(BusinessPage, parentBusinessUnitName);
   cy.clickSaveButton(AccountPage);
   cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForNewBusiness);
   cy.clickNavBarDropDownButton(LoginPage);
   cy.clickSignOutOption('Sign out');
 });

  it('Should Create a new territories in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/territories/new');
    cy.enterTerritoryName(TerritorPage, territorName);
    cy.selectTerritorParentDropdownValue(TerritorPage, 'Europe');
    cy.clickSaveButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,TerritorData.successMessageForNewTerritor);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should add the period in created assessment in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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

  it('Should create new Behavior Assessment with user collection in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Behavior Assessments');
    cy.verifyUrl('/behavior_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.behaviourAssessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/behavior_assessments/new');
    cy.enterBehaviorAssessmentName(AssessmentPage, behaviorAssessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,salesName);
    cy.selectAssessmentDropdownValues(AssessmentPage,2,AssessmentPeriodName);
    cy.selectAssessmentDropdownValues(AssessmentPage,3,'en LearnCo: Demand Creation');
    cy.checkAllBehaviorQuestionCheckbox(AssessmentPage,0);
    cy.checkAllBehaviorQuestionCheckbox(AssessmentPage,1);
    cy.checkAllBehaviorQuestionCheckbox(AssessmentPage,2);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newBehaviorAssessmentSuccessMessage);
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.assessmentUserCollectionSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create new Knowledge Assessment in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/knowledge_assessments/new');
    cy.enterAssessmentName(AssessmentPage, knowledgeAssessmentName);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,secondSalesName);
    cy.selectAssessmentDropdownValues(AssessmentPage,2,AssessmentPeriodName);
    cy.selectAssessmentDropdownValues(AssessmentPage,3,'en LearnCo: Demand Creation');
    cy.checkAllKnowledgeQuestionCheckbox(AssessmentPage,0);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.newAssessmentSuccessMessage);
    cy.clickAssessmentUserCollectionAddButton(AssessmentPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,secondUserCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterAssessmentUserCollectionDueDate(AssessmentPage, dueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.assessmentUserCollectionSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should create a new user in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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
    cy.selectMultipleDropdownValueInUserList(UserPage, 3, userCollectionName, secondUserCollectionName);
    cy.selectMultipleDropdownValueInUserList(UserPage, 4, salesName, secondSalesName);
    cy.selectDropdownValue(UserPage, 5, territorName);
    cy.selectDropdownValue(UserPage, 6, businessUnitName);
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

  it('Should add manager (previosly created user) for a new user in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/users/new');
    cy.selectDropdownValue(UserPage, 0, 'User');
    cy.selectDropdownValue(UserPage, 1, 'Active');
    cy.enterUserFirstName(UserPage, secondUserfirstName);
    cy.enterUserLastName(UserPage, secondUserlastName);
    cy.enterUserEmail(UserPage, emailAddressSecondUser);
    cy.selectDropdownValue(UserPage, 2, firstName +' '+ lastName);
    cy.selectMultipleDropdownValueInUserList(UserPage, 3, userCollectionName, secondUserCollectionName);
    cy.selectMultipleDropdownValueInUserList(UserPage, 4, salesName, secondSalesName);
    cy.selectDropdownValue(UserPage, 5, territorName);
    cy.selectDropdownValue(UserPage, 6, businessUnitName);
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

  it('Should verify the direct report user', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, emailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickKnowledgeAssessmentCollapseArrow(AssessmentPage, 0);
    cy.verifyDirectReportUserName(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should login with assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'assess\' of assessor', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Overall');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 1, 'Strategic');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 2, 'Assessments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'Improve\' of assessor', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Improve');
    cy.verifyUrl('/improve_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.improveResultTabId);
    cy.selectApplicationModuleAccess(UserPage.improveOverallProgressId);
    cy.selectApplicationModuleAccess(UserPage.improveAssignmentProgressTabId);
    cy.selectApplicationModuleAccess(UserPage.improveTeamProgressTabId);
    cy.selectApplicationModuleAccess(UserPage.improveMyLearningTabId);
    cy.selectApplicationModuleAccess(UserPage.improveLearningLibraryTabId);
    cy.selectApplicationModuleAccess(UserPage.improveMyTeamAssessmentTabId);
    cy.selectApplicationModuleAccess(UserPage.improveConversionGeniusTabId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the disable option \'My Team\'s Assignments\' under \'Improve\' of assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyDisabledOptionForAssessor(UserPage.improveDisableNavLinkId, 4, 'disabled');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'Sales Tools\' of assessor', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Sales Tools');
    cy.verifyUrl('/sales_tools_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.enabledAccoutFeatureId);
    cy.selectApplicationModuleAccess(UserPage.saleToolsReportTabId);
    cy.selectApplicationModuleAccess(UserPage.saleToolsUsageTabId);
    cy.selectApplicationModuleAccess(UserPage.saleToolOpportunitiesTabId);
    cy.selectApplicationModuleAccess(UserPage.saleToolOpportunitiesId);
    cy.selectApplicationModuleAccess(UserPage.saleToolAdminTabId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the disable option \'My Team\'s Opps\' under \'Sales Tools\' of assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyDisabledOptionForAssessor(UserPage.salesToolDisableNavLinkId, 3, 'disabled');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'assess\' of manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Overall');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 1, 'Strategic');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 2, 'Assessments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'Improve\' of manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 4, 'My Team\'s Assignments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the nav items under \'Sales Tools\' of manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 3, 'My Team\'s Opps');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the due date for his assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 3, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 3, Cypress.moment().format('ll'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the check the status for incomplete behavior assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Behavior');
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatus(UserPage,'Behavior','In Progress');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the check the status for incomplete knowledge assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Knowledge');
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatus(UserPage,'Knowledge','In Progress');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the due date for his assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 4, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 4, Cypress.moment().format('ll'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and complete the knowledge assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Knowledge');
    cy.clickNextButton(UserPage);
    cy.checkKnowledgeAssessmentRadioButton(UserPage);
    cy.clickKnowledgeAssessmentNextButton(UserPage); // submit button
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatus(UserPage,'Knowledge','Complete');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and complete the behavior assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.clickEditAssessments(UserPage,'Behavior');
    cy.clickNextButton(UserPage);
    cy.checkAllRadioButtonOfAnswer(UserPage);
    cy.clickOnSubmitButtonToCompleteAssessment(UserPage);
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatus(UserPage,'Behavior','Complete');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the complete date for his assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnData(UserPage,'Behavior', 5, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnData(UserPage,'Knowledge', 5, Cypress.moment().format('ll'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the information message when user do not have account assess', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountOverallTabId);
    cy.unselectApplicationModuleAccess(UserPage.accountStrategicTabId);
    cy.unselectApplicationModuleAccess(UserPage.accountReportTabId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyInformationMessageWhenHasNoAccess(UserPage, 'No module is enabled for this account. Please contact your admin.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify assessment under \'assess\' when user have only application module access for account assess', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Assessments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify nav item under \'improve\' when user have only application module access for account improve', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.assessNavTitleId);
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify nav item under \'sale Tools\' when user have only application module access for account sales tools', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.assessNavTitleId);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.improveNavTitleId);
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify nav item under \'assess, improve and sale Tools\' when user have all application module access for account ', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Assessments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify assess tab items on assess page', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Overall');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 1, 'Strategic');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 2, 'Assessments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the information message when user do not have account assess', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountOverallTabId);
    cy.unselectApplicationModuleAccess(UserPage.accountStrategicTabId);
    cy.unselectApplicationModuleAccess(UserPage.accountReportTabId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.verifyInformationMessageWhenHasNoAccess(UserPage, 'No module is enabled for this account. Please contact your admin.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify assessment under \'assess\' when user have only application module access for account assess', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Assessments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify nav item under \'improve\' when user have only application module access for account improve', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.assessNavTitleId);
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 4, 'My Team\'s Assignments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify nav item under \'sale Tools\' when user have only application module access for account sales tools', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.unselectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.unselectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.assessNavTitleId);
    cy.verifyAssessNavitemsIsNotVisible(UserPage.improveNavTitleId);
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 3, 'My Team\'s Opps');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify nav item under \'assess, improve and sale Tools\' when user have all application module access for account ', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Assessments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 4, 'My Team\'s Assignments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 3, 'My Team\'s Opps');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify assess tab items on assess page', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 0, 'Overall');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 1, 'Strategic');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 2, 'Assessments');
    cy.verifyAssessNavitems(UserPage.assessNavLinkId, 3, 'Reports');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 1, 'Overall Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 2, 'Assignment Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 3, 'Team Progress');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 4, 'My Team\'s Assignments');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 5, 'My Learning');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 6, 'Learning Library');
    cy.verifyAssessNavitems(UserPage.improveNavLinkId, 7, 'Conversation Genius');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 0, 'Results');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 1, 'Usage');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 2, 'My Opportunities');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 3, 'My Team\'s Opps');
    cy.verifyAssessNavitems(UserPage.salesToolNavLinkId, 4, 'Admin');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Org Chart) name on report page', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Org Chart) report with behavior assessment when is not complete', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, behaviorAssessmentName);
    cy.verifyReportTreeTableText(UserPage, 'There is no data for selected Assessment');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Territory) name on report page', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Territory) report with behavior assessment when is not complete', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, behaviorAssessmentName);
    cy.verifyReportTreeTableText(UserPage, 'There is no data for selected Assessment');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Business Unit) name on report page', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should verify the Assessment Reporting (Business Unit) report with behavior assessment when is not complete', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Account Modules');
    cy.verifyUrl('/account_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.accountAssessCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountImproveCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.accountSalesToolCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickDropdownMenuItem(UserPage,'Assess');
    cy.verifyUrl('/assess_features');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.selectApplicationModuleAccess(UserPage.assessTabOverallCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabStrategicTabCheckboxId);
    cy.selectApplicationModuleAccess(UserPage.assessTabReportCheckboxId);
    cy.clickSaveButtonByIndex(AccountPage.saveButton, 0);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessageAccountFeature);
    cy.clickDropdown(UserPage, 4);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, behaviorAssessmentName);
    cy.verifyReportTreeTableText(UserPage, 'There is no data for selected Assessment');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and complete the knowledge assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.completeAssessments(UserPage,'Knowledge', 'Not Started');
    cy.clickNextButton(UserPage);
    cy.checkKnowledgeAssessmentRadioButton(UserPage);
    cy.clickKnowledgeAssessmentNextButton(UserPage); // submit button
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatusOnManager(UserPage,'Knowledge','Complete');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and complete the behavior assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.completeAssessments(UserPage,'Behavior', 'Not Started');
    cy.clickNextButton(UserPage);
    cy.checkAllRadioButtonOfAnswer(UserPage);
    cy.clickOnSubmitButtonToCompleteAssessment(UserPage);
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatusOnManager(UserPage,'Behavior','Complete');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and complete the behavior assessment with Myself assessed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.completeNotStartedAssessments(UserPage,'Behavior', 'Not Started');
    cy.clickNextButton(UserPage);
    cy.checkAllRadioButtonOfAnswer(UserPage);
    cy.clickOnSubmitButtonToCompleteAssessment(UserPage);
    cy.verifySuccessMessgeForCompleteAssessment(UserPage, UserData.completeAssessmentSuccessMessage);
    cy.clickCloseButtonOnPopupOfCompleteAssessment(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyAssessmentsStatusOnManager(UserPage,'Behavior','Complete');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the complete date for his assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickNavItemAssessTab('Assessments');
    cy.verifyMyAssessmentsColumnDataForManagerAccount(UserPage,'Behavior', 5, Cypress.moment().format('ll'));
    cy.verifyMyAssessmentsColumnDataForManagerAccount(UserPage,'Knowledge', 5, Cypress.moment().format('ll'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) Group report with behavior assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, firstName +' '+ lastName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 2, 2, salesName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) Group report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 2, 2, salesName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) individual report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 2, 2, salesName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 4, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) individual report with behavior assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, firstName +' '+ lastName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 2, 2, salesName);
    cy.verifyindividualReportPdfIconIsPresent(UserPage, 1, 4);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) Group report with knowledge assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, firstName +' '+ lastName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 2, 2, secondSalesName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) Group report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 2, 2, secondSalesName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) individual report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 2, 2, secondSalesName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 4, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Org Chart) individual report with knowledge assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 0, 'Assessment Reporting (Org Chart)');
    cy.selectReportOptions(UserPage, 0, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 1, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, firstName +' '+ lastName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 2, 2, secondSalesName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 1, 4, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Group report with behavior assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, territorName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 2, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Group report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) individual report for territory with behavior assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, territorName);
    cy.verifyindividualReportPdfIconIsPresent(UserPage, 1, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Individual report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Group report with knowledge assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, territorName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 2, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) individual report for territory with knowledge assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, territorName);
    cy.verifyindividualReportPdfIconIsPresent(UserPage, 1, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Group report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Individual report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Group report with knowledge assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, firstName +' '+ lastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 3, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Territory) Individual report with knowledge assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 1, 'Assessment Reporting (Territory)');
    cy.selectReportOptions(UserPage, 1, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 2, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, firstName +' '+ lastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 3, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Group report with behavior assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, businessUnitName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 2, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Group report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) individual report for business unit with behavior assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, businessUnitName);
    cy.verifyindividualReportPdfIconIsPresent(UserPage, 1, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Individual report with behavior assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, behaviorAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 2, 1, 3, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Group report with knowledge assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, businessUnitName);
    cy.verifyGroupReportPdfIcon(UserPage, 1, 2, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) individual report for business unit with knowledge assessment when is completed', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyAssessmentReportOnReports(UserPage, 1, 1, 2, businessUnitName);
    cy.verifyindividualReportPdfIconIsPresent(UserPage, 1, 3);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Group report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 2, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Individual report with knowledge assessment when is completed for assessor', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 2, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Group report with knowledge assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, firstName +' '+ lastName);
    cy.verifyGroupReportPdfIconIsPresent(UserPage, 3, 2);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the Assessment Reporting (Business Unit) Individual report with knowledge assessment when is completed for manager', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportAnimatedFadeInText(UserPage.reportWarningCardTitle, 2, 'Assessment Reporting (Business Unit)');
    cy.selectReportOptions(UserPage, 2, AssessmentPeriodName);
    cy.selectReportOptions(UserPage, 3, knowledgeAssessmentName);
    cy.verifyUserNameOnReportWithloop(UserPage, firstName +' '+ lastName);
    cy.verifyIndivisualReportPdfIcon(UserPage, 3, 3, 'Download as Pdf');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify user is able to collapse/extends report', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 3);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Reports');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportDropdownIcon, 0, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportDropdownIcon, 1, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportDropdownIcon, 2, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportDropdownIcon, 0, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportDropdownIcon, 1, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportDropdownIcon, 2, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the assessment table name', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 2);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Assessments');
    cy.verifyReportAnimatedFadeInText(UserPage.assessmentReportsTitleId, 0, 'My Assigned Assessments');
    cy.verifyReportAnimatedFadeInText(UserPage.assessmentReportsTitleId, 2, 'My Direct Reports - Assessment Assignments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify user is able to collapse/extends assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 2);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Assessments');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 3, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 3, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the assessment table name', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 2);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Assessments');
    cy.verifyReportAnimatedFadeInText(UserPage.assessmentReportsTitleId, 0, 'My Assigned Assessments');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify user is able to collapse/extends assessment', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 2);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Assessments');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and Verify the content on strategic for assessor account', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 0, 'Name:');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 2, 'Manager:');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 4, 'Sales Roles:');
    cy.verifyStrategicPageContent(UserPage.strategicCompetencyAssessmentResultId, 0, 'Strategic Competency Assessment Results');
    cy.wait(2000);
    cy.verifyStrategicPageContent(UserPage.strategicUserCountId, 0, '1');
    cy.verifyStrategicPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and Verify the content on strategic for manager account', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 0, 'Name:');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 2, 'Manager:');
    cy.verifyStrategicPageContent(UserPage.strategicLabelId, 4, 'Sales Roles:');
    cy.verifyStrategicPageContent(UserPage.strategicCompetencyAssessmentResultId, 0, 'Strategic Competency Assessment Results');
    cy.wait(2000);
    cy.verifyStrategicPageContent(UserPage.strategicUserCountId, 0, '2');
    cy.verifyStrategicPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.verifyStrategicPageContent(UserPage.strategicIndividualResultTextId, 0, 'Show Individual Result');
    cy.verifyStrategicPageContent(UserPage.strategicResultTextId, 0, 'Direct Reports');
    cy.verifyStrategicPageContent(UserPage.strategicResultTextId, 1, 'Stacked Rank');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify user is able to collapse/extends overall result view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.wait(5000);
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 0, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 0, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-up');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and Verify the content on overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.wait(7000);
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextId, 0, 'Overall - Role Averages');
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifyOverallPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.verifyOverallPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 1, 'Knowledge Assessment Results');
    cy.verifyOverallPageContent(UserPage.overallCompetencyNameId, 0, 'en LearnCo: Demand Cr...');
    cy.verifyOverallPageContent(UserPage.overallCompetencyNameId, 2, 'en LearnCo: Demand Cr...');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextIdInGraph, 0, 'Role Average');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextIdInGraph, 1, 'Role Average');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and Verify the filter placeholder on overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextId, 0, 'Overall - Role Averages');
    cy.verifyOverallPageContent(UserPage.overallSelectFieldUserCollectionId, 0, 'Please Select User Collections');
    cy.verifyOverallPageContent(UserPage.overallSearchFieldPlaceholderTextId, 0, 'Please Select Territories');
    cy.verifyOverallPageContent(UserPage.overallSearchFieldPlaceholderTextId, 1, 'Please Select Business Units');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify user is able to collapse/extends overall result view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.wait(5000);
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 0, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 0, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.assessmentReportsTitleId, 1, 'fa-angle-up');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and Verify the content on overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.wait(7000);
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextId, 0, 'Overall - Role Averages');
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifyOverallPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.verifyOverallPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 1, 'Knowledge Assessment Results');
    cy.verifyOverallPageContent(UserPage.overallCompetencyNameId, 0, 'en LearnCo: Demand Cr...');
    cy.verifyOverallPageContent(UserPage.overallCompetencyNameId, 2, 'en LearnCo: Demand Cr...');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextIdInGraph, 0, 'Role Average');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextIdInGraph, 1, 'Role Average');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and Verify the filter placeholder on overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallPageContent(UserPage.overallRoleAverageTextId, 0, 'Overall - Role Averages');
    cy.verifyOverallPageContent(UserPage.overallSelectFieldUserCollectionId, 0, 'Please Select User Collections');
    cy.verifyOverallPageContent(UserPage.overallSearchFieldPlaceholderTextId, 0, 'Please Select Territories');
    cy.verifyOverallPageContent(UserPage.overallSearchFieldPlaceholderTextId, 1, 'Please Select Business Units');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the default assessment period in overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and filter the overall result with single user collection', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and filter the overall result with multiple user collection', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, secondUserCollectionName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and filter the overall result with territory', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and filter the overall result with business unit', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify the filter result with all available option', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, secondUserCollectionName);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the default assessment period in overall page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and filter the overall result with single user collection', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and filter the overall result with multiple user collection', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, secondUserCollectionName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and filter the overall result with territory', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and filter the overall result with business unit', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should assessor can login and verify the filter result with all available option', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 0);
    cy.verifyReportAnimatedFadeInText(UserPage.reportAnimatedFadeInId, 0, 'Overall');
    cy.verifyOverallFilterOption(UserPage.overallAssessmentPeriodDropdownId, AssessmentPeriodName);
    cy.clickOnDropdownField(UserPage.overallUserCollectionDropdownId);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, userCollectionName);
    cy.EnterValueInDropdownInput(UserPage.overallUserCollectionDropdownInputId, secondUserCollectionName);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(5000);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, salesName);
    cy.verifySalesNameOnOverallPageContent(UserPage.overallSalesRoleTextId, secondSalesName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default assessment peroid on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyAssessmentPeriodFieldOnStrategicPage(UserPage, AssessmentPeriodName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with single sales role on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.selectDropDownValues(UserPage, 0, salesName, UserPage.salesRoleInputReactSelect);
    cy.verifyStrategicPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with multiple sales role on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.selectDropDownValues(UserPage, 0, salesName, UserPage.salesRoleInputReactSelect);
    cy.selectDropDownValues(UserPage, 0, secondSalesName, UserPage.salesRoleInputReactSelect);
    cy.verifyStrategicPageContent(UserPage.strategicKnowledgeAssessmentResultTextId, 0, 'Knowledge Assessment Results');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with one user collection on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.selectDropDownValues(UserPage, 1, userCollectionName, UserPage.userCollectionInputReactSelect);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with multiple user collection on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.selectDropDownValues(UserPage, 1, userCollectionName, UserPage.userCollectionInputReactSelect);
    cy.selectDropDownValues(UserPage, 1, secondUserCollectionName, UserPage.userCollectionInputReactSelect);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with Territory on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.wait(2000);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with Business Unit on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(2000);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and filter result with all option on strategic page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickAssessNavitems(UserPage.assessNavLinkId, 1);
    cy.verifyStrategicPageContent(UserPage.reportAnimatedFadeInId, 0, 'Strategic');
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.selectDropDownValues(UserPage, 0, salesName, UserPage.salesRoleInputReactSelect);
    cy.selectDropDownValues(UserPage, 0, secondSalesName, UserPage.salesRoleInputReactSelect);
    cy.selectDropDownValues(UserPage, 1, secondUserCollectionName, UserPage.userCollectionInputReactSelect);
    cy.selectDropDownValues(UserPage, 1, userCollectionName, UserPage.userCollectionInputReactSelect);
    cy.clickOnDropdownField(UserPage.overallTerritoryDropdownId);
    cy.contains(territorName).click({force:true});
    cy.wait(2000);
    cy.clickOnDropdownField(UserPage.overallBusinessDropdownId);
    cy.contains(businessUnitName).click({force:true});
    cy.wait(2000);
    cy.verifyGraphOnStrategicPage(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.noLearningTextActivityId, 0, 'There are no activities assigned to you.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.noLearningTextActivityId, 0, 'There are no activities assigned to you.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify user is able to collapse/extends \'My Learning\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 2, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 2, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify user is able to collapse/extends \'My Learning\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 2, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 2, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Learning Library\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Learning Library').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Learning Library');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Library');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 3, 'Export Team Activity');
    cy.verifyPageContent(UserPage.noLicensedContentTextId, 0, 'We\'re sorry. You are not licensed to see this content.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Learning Library\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Learning Library').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Learning Library');
    cy.verifyPageContent(UserPage.noLicensedContentTextId, 0, 'We\'re sorry. You are not licensed to see this content.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should manager can login and verify user is able to collapse/extends \'Learning Library\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Learning Library').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Learning Library');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 4, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 4, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify user is able to collapse/extends \'Learning Library\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Learning Library').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Learning Library');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 1, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 1, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Coach');
    cy.verifyPageContent(UserPage.coachQuizModeLabelId, 0, 'Coach / Quiz Mode');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Coach');
    cy.verifyPageContent(UserPage.coachQuizModeLabelId, 0, 'Coach / Quiz Mode');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of My Team\'s Assignments page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Team\'s Assignments').click({force:true});
    cy.verifyUrl('/improve/my_team_assignments');
    cy.verifyPageContent(UserPage.myTeamAssignmentTextId, 0, 'My Team\'s Assignments');
    cy.verifyPageContent(UserPage.myTeamAssignmentContentId, 0, 'Assignments to Review');
    cy.verifyPageContent(UserPage.noAssignmentAssignId, 0, 'There are no assignments assigned to you to review.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify user is able to collapse/extends \'My Team\'s Assignments\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Team\'s Assignments').click({force:true});
    cy.verifyUrl('/improve/my_team_assignments');
    cy.verifyPageContent(UserPage.myTeamAssignmentTextId, 0, 'My Team\'s Assignments');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.myTeamAssignmentContentId, 1, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.myTeamAssignmentContentId, 1, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '2');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 0 , 'Organizational Totals');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 1 , 'My Team');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 0, 'Total Assignments');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 1, 'Complete');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 2, 'Submitted');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 3, 'Returned');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 4, 'In Progress');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 5, 'Not Started');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 6, 'Learning Progress %');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 7, '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 0 , 'User Name');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 1 , 'Total Assignments');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 2 , 'Complete');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 3 , 'Submitted');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 4 , 'Returned');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 5 , 'In Progress');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 6 , 'Not Started');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 7 , 'Learning Progress %');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 8 , '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 9 , 'Manager');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 10 , 'Direct Reports');
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 0 ,firstName +' '+lastName);
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 1 ,secondUserfirstName+' '+secondUserlastName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '1');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 0 , 'Organizational Totals');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 1 , 'My Team');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 0, 'Total Assignments');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 1, 'Complete');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 2, 'Submitted');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 3, 'Returned');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 4, 'In Progress');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 5, 'Not Started');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 6, 'Learning Progress %');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 7, '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 0 , 'User Name');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 1 , 'Total Assignments');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 2 , 'Complete');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 3 , 'Submitted');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 4 , 'Returned');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 5 , 'In Progress');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 6 , 'Not Started');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 7 , 'Learning Progress %');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 8 , '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 9 , 'Manager');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 10 , 'Direct Reports');
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 0 ,secondUserfirstName+' '+secondUserlastName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Results\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Results').click({force:true});
    cy.verifyUrl('/improve/results');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Results');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,3);
    cy.verifyPageContent(UserPage.resultsInfoId, 0, 'Not enough data available to display this chart; please contact your administrator.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Results\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Results').click({force:true});
    cy.verifyUrl('/improve/results');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Results');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,3);
    cy.verifyPageContent(UserPage.resultsInfoId, 0, 'Not enough data available to display this chart; please contact your administrator.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Overall Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Overall Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '2');
    cy.verifyPageContent(UserPage.overallHelpTextId, 0, 'The graph(s) below will display your team\'s Learning Progress % for learning plans.');
    cy.verifyPageContent(UserPage.overallHeaderLabelId, 0, 'Learning Plan Progress');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 0 , 'Organizational Totals');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 1 , 'My Team');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 0, 'Total Activities');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 1, 'Complete');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 2, 'In Progress');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 3, 'Not Started');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 4, 'Learning Progress %');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 5, '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 0 , 'User Name');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 1 , 'Total Activities');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 2 , 'Complete');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 3 , 'In Progress');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 4 , 'Not Started');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 5 , 'Learning Progress %');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 6 , '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 7 , 'Manager');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 8 , 'Direct Reports');
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 0 , firstName +' '+lastName);
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 1 , secondUserfirstName+' '+secondUserlastName);
    cy.verifyPageContent(UserPage.overallMarkedLabelId, 0 , '* Indicates at least one assignment is awaiting manager approval');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Overall Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Overall Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.wait(3000);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '1');
    cy.verifyPageContent(UserPage.overallHelpTextId, 0, 'The graph(s) below will display your team\'s Learning Progress % for learning plans.');
    cy.verifyPageContent(UserPage.overallHeaderLabelId, 0, 'Learning Plan Progress');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 0 , 'Organizational Totals');
    cy.verifyPageContent(UserPage.assignmentProgressHeaderTextId, 1 , 'My Team');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 0, 'Total Activities');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 1, 'Complete');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 2, 'In Progress');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 3, 'Not Started');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 4, 'Learning Progress %');
    cy.verifyPageContent(UserPage.organizationTableLabelId, 5, '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 0 , 'User Name');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 1 , 'Total Activities');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 2 , 'Complete');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 3 , 'In Progress');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 4 , 'Not Started');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 5 , 'Learning Progress %');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 6 , '% Overdue');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 7 , 'Manager');
    cy.verifyPageContent(UserPage.myTeamTableHeaderLabelId, 8 , 'Direct Reports');
    cy.verifyPageContent(UserPage.myTeamTableUserNameLabelId, 0 , secondUserfirstName+' '+secondUserlastName);
    cy.verifyPageContent(UserPage.overallMarkedLabelId, 0 , '* Indicates at least one assignment is awaiting manager approval');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify user is able to collapse/extends \'Overall Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.myTeamAssignmentTextId, 0, 'Overall Progress');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.overallHeaderSectionId, 0, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.overallHeaderSectionId, 0, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify user is able to collapse/extends \'Overall Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.myTeamAssignmentTextId, 0, 'Overall Progress');
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.overallHeaderSectionId, 0, 'fa-angle-up');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.overallHeaderSectionId, 0, 'fa-angle-down');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Team Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Team Progress').click({force:true});
    cy.verifyUrl('/improve/team_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Team Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.teamProgressLabelId, 0, 'Bill Jenkins - Team');
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,0);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Team Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Team Progress').click({force:true});
    cy.verifyUrl('/improve/team_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Team Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should create a new Learning Plan with Learning Plan Items in \'LearnCo\' account', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,LoginData.email);
    cy.enterPassword(LoginPage,LoginData.password);
    cy.loginButton(LoginPage);
    cy.openAccountUsingLink(AccountPage,2); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/learning_plans/new');
    cy.enterLearningPlanName(LearningPage, learningName);
    cy.selectLearningSalesRoleDropdownValue(LearningPage, salesName);
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 0, 'en LearnCo: Demand Creation');
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 1, 'foundational');
    cy.wait(2000);
    cy.selectLearningPlanItems(LearningPage, 2, 'Learn');
    cy.wait(2000);
    cy.selectAllCheckboxLearningPlanItems(LearningPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearning);
    cy.contains(learningName).click({force:true});
    cy.wait(5000);
    cy.clickNewButton(AccountPage);
    cy.selectAssessmentDropdownValues(AssessmentPage,0,userCollectionName);
    cy.selectAssessmentUserCollectionCheckbox(AssessmentPage, 0);
    cy.enterNewLearningUserCollectionDueDate(LearningPage, futureDueDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForNewLearningUserCollection);
  });

  it('Should Manager can login and verify the added learning plan of \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the added learning plan of \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the learning details by expanding on \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-up');
    cy.verifyPageContent(UserPage.myLearningLessonId, 0, 'en LearnCo: Demand Creation Best Practices');
    cy.verifyPageContent(UserPage.myLearningLessonDateId, 0, 'Due on '+Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the learning details by expanding on \'My Learning\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('My Learning').click({force:true});
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'My Learning');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, 'Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 4, 'Show past completed plans');
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-up');
    cy.verifyPageContent(UserPage.myLearningLessonId, 0, 'en LearnCo: Demand Creation Best Practices');
    cy.verifyPageContent(UserPage.myLearningLessonDateId, 0, 'Due on '+Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the Learning Plan content of \'Overall Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Overall Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyElementText(UserPage.overallProgressAxisLabelId,learningName);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '2');
    cy.verifyPageContent(UserPage.overallHeaderLabelId, 0, 'Learning Plan Progress');
    cy.verifyTotalActivities(UserPage.overallProgressTableActivityId,UserPage.overallProgressActivityValueId);
    cy.verifyTotalActivities(UserPage.overallProgressTableActivityId,UserPage.overallProgressActivityValueId);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the Learning Plan content of \'Overall Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Overall Progress').click({force:true});
    cy.verifyUrl('/improve/overall_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Overall Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyElementText(UserPage.overallProgressAxisLabelId,learningName);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '1');
    cy.verifyPageContent(UserPage.overallHeaderLabelId, 0, 'Learning Plan Progress');
    cy.verifyTotalActivities(UserPage.overallProgressTableActivityId,UserPage.overallProgressActivityValueId);
    cy.verifyTotalActivities(UserPage.overallProgressTableActivityId,UserPage.overallProgressActivityValueId);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the learning plan content of \'Team Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Team Progress').click({force:true});
    cy.verifyUrl('/improve/team_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Team Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyPageContent(UserPage.teamProgressLabelId, 0, 'Bill Jenkins - Team');
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,0);
    cy.verifyPageContent(UserPage.teamProgressLabelId, 1, 'My Team');
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,1);
    cy.clickOnTeamOption(UserPage.teamProgressLabelId,1);
    cy.verifyPageContent(UserPage.teamProgressLabel1Id, 0, firstName +' '+ lastName);
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,0);
    cy.verifyPageContent(UserPage.teamProgressLabel1Id, 1, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,1);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the learning plan content of \'Team Progress\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage, password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Team Progress').click({force:true});
    cy.verifyUrl('/improve/team_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Team Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyPageContent(UserPage.teamProgressLabel1Id, 0, secondUserfirstName +' '+ secondUserlastName);
    cy.verifyTeamProgressBar(UserPage.teamProgressBarId,0);
    cy.clickOnTeamOption(UserPage.teamProgressLabel1Id,0);
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-up');
    cy.verifyPageContent(UserPage.myLearningLessonId, 0, 'en LearnCo: Demand Creation Best Practices');
    cy.verifyPageContent(UserPage.myLearningLessonDateId, 0, 'Due on '+Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the learning plan content of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyPageContent(UserPage.assignmentProgressPlaceholderId, 0, 'Please Select Learning Plans');
    cy.wait(3000);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '2');
    cy.wait(3000);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the learning plan content of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,5);
    cy.verifyPageContent(UserPage.assignmentProgressPlaceholderId, 0, 'Please Select Learning Plans');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '1');
    cy.clickOnTeamOption(UserPage.assessorInTeamTableId, 0);
    cy.verifyPageContent(UserPage.myLearningActivityId, 0, learningName);
    cy.verifyElementText(UserPage.myLearningActivityFutureDateId,Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.verifyReportDropdownIconIsInExtendForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-down');
    cy.verifyReportDropdownIconIsInCollapseForm(UserPage.reportAnimatedFadeInId, 8, 'fa-angle-up');
    cy.verifyPageContent(UserPage.myLearningLessonId, 0, 'en LearnCo: Demand Creation Best Practices');
    cy.verifyPageContent(UserPage.myLearningLessonDateId, 0, 'Due on '+Cypress.moment(futureDueDate).format('MMM DD, YYYY'));
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the manager name in my team table of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyPageContent(UserPage.myteamManagerTextId, 0, firstName +' '+ lastName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the direct report count in my team table of \'Assignment Progress\' view', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Assignment Progress').click({force:true});
    cy.verifyUrl('/improve/assignment_progress');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Assignment Progress');
    cy.wait(3000);
    cy.verifyPageContent(UserPage.myteamDirectReportTextId, 0, '1');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and select industry and role for \'Fluency Coach\' or verify pain and reason on \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Coach');
    cy.wait(5000);
    cy.contains('Select Industry').click({force:true});
    cy.contains('Manufacturing').click({force:true});
    cy.contains('Select Role').click({force:true});
    cy.contains('VP of Sales').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 0, 'Select one of the valid Pains for this Industry and Job Role:');
    cy.clickButton(UserPage.painSecondaryButtonId, 0);
    cy.verifyPageContent(UserPage.validPainTextId, 1, 'Choose a Reason for this Pain to reveal the corresponding Capability Vision:');
    cy.clickButton(UserPage.reasonSecondaryButtonId, 0);
    cy.verifyButton(UserPage.tryAgainButtonId, 0);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and select industry and role for \'Fluency Coach\' or verify pain and reason on \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Coach');
    cy.wait(5000);
    cy.contains('Select Industry').click({force:true});
    cy.contains('Manufacturing').click({force:true});
    cy.contains('Select Role').click({force:true});
    cy.contains('VP of Sales').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 0, 'Select one of the valid Pains for this Industry and Job Role:');
    cy.clickButton(UserPage.painSecondaryButtonId, 0);
    cy.verifyPageContent(UserPage.validPainTextId, 1, 'Choose a Reason for this Pain to reveal the corresponding Capability Vision:');
    cy.clickButton(UserPage.reasonSecondaryButtonId, 0);
    cy.verifyButton(UserPage.tryAgainButtonId, 0);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and select industry and role for \'Fluency Quiz\' or verify pain and reason on \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.clickButton(UserPage.switchLabelId, 0);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Quiz');
    cy.wait(5000);
    cy.contains('Select Industry').click({force:true});
    cy.contains('Manufacturing').click({force:true});
    cy.contains('Select Role').click({force:true});
    cy.contains('VP of Sales').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 0, 'Select one of the valid Pains for this Industry and Job Role:');
    cy.contains('Lack of visibility into critical sales data').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 1, 'Choose a Reason for this Pain to reveal the corresponding Capability Vision:');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and select industry and role for \'Fluency Quiz\' or verify pain and reason on \'Conversation Genius\' page', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.contains('Conversation Genius').click({force:true});
    cy.verifyUrl('/improve/conversation_genius');
    cy.clickButton(UserPage.switchLabelId, 0);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Quiz');
    cy.wait(5000);
    cy.contains('Select Industry').click({force:true});
    cy.contains('Manufacturing').click({force:true});
    cy.contains('Select Role').click({force:true});
    cy.contains('VP of Sales').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 0, 'Select one of the valid Pains for this Industry and Job Role:');
    cy.contains('Lack of visibility into critical sales data').click({force:true});
    cy.verifyPageContent(UserPage.validPainTextId, 1, 'Choose a Reason for this Pain to reveal the corresponding Capability Vision:');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Result\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 0);
    cy.verifyUrl('/sales_tools/results');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Results');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,3);
    cy.verifyPageContent(UserPage.salesToolsResultTextId, 15, 'Not enough data available to display this chart; please contact your administrator.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Usage\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 1);
    cy.verifyUrl('/sales_tools/sales_tool_usage');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Usage');
    cy.wait(3000);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '2');
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.usageTableHeaderId, 0, 'Sales Tool');
    cy.verifyPageContent(UserPage.usageTableHeaderId, 1, '# of Opportunities');
    cy.verifyPageContent(UserPage.usageTableHeaderId, 2, '% of Engaged Opportunities');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 0, 'My Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 1, 'Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 2, 'Add New');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'My Team\'s Opps\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 3);
    cy.verifyUrl('/sales_tools/my_team/opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 0, 'My Team’s Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 1, 'Opportunities');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the default content of \'Admin\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButtonWithTargetAttr(UserPage.salesToolNavAnchorId, 4);
    cy.verifyUrl('/sales_tools/admin/industries');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 0, 'Industries');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 1, 'Job Roles');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 2, 'Pain');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 3, 'Capabilities');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 4, 'Pain Report');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 5, 'Letter Template');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 6, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.adminTableHeaderId, 0, 'Name');
    cy.verifyPageContent(UserPage.adminTableHeaderId, 1, 'Languages');
    cy.verifyPageContent(UserPage.adminDropdownLabelId, 0, 'Actions');
    cy.clickButton(LoginPage.navItemDropDownId,0);
    cy.clickSignOutOption('Sign out');
  });

  // Assessor Sales Tools verification test cases

  it('Should Assessor can login and verify the default content of \'Result\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 0);
    cy.verifyUrl('/sales_tools/results');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Results');
    cy.wait(3000);
    cy.verifyAssessmentSelectFieldCount(UserPage,3);
    cy.verifyPageContent(UserPage.salesToolsResultTextId, 15, 'Not enough data available to display this chart; please contact your administrator.');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Usage\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 1);
    cy.verifyUrl('/sales_tools/sales_tool_usage');
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 0, 'Usage');
    cy.wait(3000);
    cy.verifyPageContent(UserPage.reportAnimatedFadeInId, 1, '1');
    cy.verifyAssessmentSelectFieldCount(UserPage,4);
    cy.verifyPageContent(UserPage.usageTableHeaderId, 0, 'Sales Tool');
    cy.verifyPageContent(UserPage.usageTableHeaderId, 1, '# of Opportunities');
    cy.verifyPageContent(UserPage.usageTableHeaderId, 2, '% of Engaged Opportunities');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 0, 'My Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 1, 'Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 2, 'Add New');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the default content of \'Admin\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButtonWithTargetAttr(UserPage.salesToolNavAnchorId, 4);
    cy.verifyUrl('/sales_tools/admin/industries');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 0, 'Industries');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 1, 'Job Roles');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 2, 'Pain');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 3, 'Capabilities');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 4, 'Pain Report');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 5, 'Letter Template');
    cy.verifyPageContent(UserPage.adminMenuLabelId, 6, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.adminTableHeaderId, 0, 'Name');
    cy.verifyPageContent(UserPage.adminTableHeaderId, 1, 'Languages');
    cy.verifyPageContent(UserPage.adminDropdownLabelId, 0, 'Actions');
    cy.clickButton(LoginPage.navItemDropDownId,0);
    cy.clickSignOutOption('Sign out');
  });

  // Manager Action Opportunities Test Cases

  it('Should Manager can login and verify the validation message for mandatory fields of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 0, 'My Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 1, 'Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 2, 'Add New');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId);
    cy.verifyPageContent(UserPage.myOpportunitiesErrorId, 0, 'Please enter opportunity name');
    cy.verifyPageContent(UserPage.myOpportunitiesErrorId, 1, 'Please enter account name');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and add new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and edit new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesMandInputsAndVerify(UserPage, opportunityName);
    cy.editNewOpportunitiesAndVerify(UserPage, opportunityName);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and delete new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesMandInputsAndVerify(UserPage, opportunityName);
    cy.deleteNewOpportunitiesAndVerify(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify default form for new Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel1Id, 0, 'Pain:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel2Id, 0, 'Value:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel3Id, 0, 'Power:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel4Id, 0, 'Collaborate:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel5Id, 0, 'Vision:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel6Id, 0, 'Compelling Reason to Act:');
    cy.verifyElementExistOrNot(UserPage.strengthSalesChecksSelectOptionId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify cancel functionality on Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId);
    cy.verifyUrl('/sales_checks');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and add Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and update Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifySelectedOptionOnStrengthChecks(UserPage);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.strengthSalesChecksItemId,0);
    cy.verifyUpdatedItemData(UserPage);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and delete Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifySelectedOptionOnStrengthChecks(UserPage);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify modal message while deletion of existing Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm');
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Strength of Sale Check?');
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players');
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify validation message for new Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId);
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,0,'Please select target Industry');
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,1,'Please select target Job Role');
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,2,'Please select Pain for this Key Player');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify new added Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and update added Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.updateAndVerifyKeyPlayers(UserPage); // update and verify Added key players
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and delete existing Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0); // click on delete button
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // delete the key player
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players'); // verify key player title
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify modal message while deletion of existing Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0); // click on delete button
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm'); // verify modal confirm title
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Key Player?'); // verify Modal message
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // delete the key player
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players'); // verify key player title
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify default Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify validation message for add Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersErrorLabelId,0,'Please select a Template.'); // verify validation message for mandatory fields
    cy.verifyPageContent(UserPage.lettersErrorLabelId,1,'Please enter Letter Name.'); // verify validation message for mandatory fields
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify cancel functionality for new letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId); // click on cancel button of letters
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and add Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.selectOptionFromSelectElement(UserPage.lettersTemplateId,'1'); // Select Template for letter
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersCreatedLabelId,0,'Sponsor Letter'); // verify created Letter
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and delete created Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.selectOptionFromSelectElement(UserPage.lettersTemplateId,'1'); // Select Template for letter
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersCreatedLabelId,0,'Sponsor Letter'); // verify created Letter
    cy.clickButton(UserPage.lettersCreatedLabelId,0);
    cy.clickButton(UserPage.lettersDeleteButtonId,0); // click on Delete Button
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // confirm the delete modal
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify default Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify validation message for add Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersErrorLabelId,0,'Please select a Template.'); // verify validation message for mandatory fields
    cy.verifyPageContent(UserPage.lettersErrorLabelId,1,'Please enter Letter Name.'); // verify validation message for mandatory fields
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify cancel functionality for new letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId); // click on cancel button of letters
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and add Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.selectOptionFromSelectElement(UserPage.lettersTemplateId,'1'); // Select Template for letter
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersCreatedLabelId,0,'Sponsor Letter'); // verify created Letter
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and delete created Letters of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.keyPlayersPainAnchorId,0); // click on key player anchor tag
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on add new button of letters
    cy.selectOptionFromSelectElement(UserPage.lettersTemplateId,'1'); // Select Template for letter
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on save button of letters
    cy.verifyPageContent(UserPage.lettersCreatedLabelId,0,'Sponsor Letter'); // verify created Letter
    cy.clickButton(UserPage.lettersCreatedLabelId,0);
    cy.clickButton(UserPage.lettersDeleteButtonId,0); // click on Delete Button
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // confirm the delete modal
    cy.verifyPageContent(UserPage.lettersTitleLabel1Id, 0, 'Letters'); // verify Letters title
    cy.verifyPageContent(UserPage.lettersTitleLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and update added Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.updateAndVerifyKeyPlayers(UserPage); // update and verify Added key players
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and delete existing Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0); // click on delete button
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // delete the key player
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players'); // verify key player title
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify modal message while deletion of existing Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0); // click on delete button
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm'); // verify modal confirm title
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Key Player?'); // verify Modal message
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0); // delete the key player
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players'); // verify key player title
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Add New title
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify default form for new Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanAddNewDefaultFormId,'not.exist');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanAddNewDefaultFormId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanEventNameId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanResponsibleId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanResourcesId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanSaveActivityId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify cancel functionality on Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify validation message for Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContent(UserPage.collaborationPlanErrorMessId, 0, 'Please enter an event name');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and add Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and update Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanResponsibleId,'0','');
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanResourcesId,'0','');
    cy.enterTextAndVerifyWithValue(UserPage.collaborationPlanResponsibleId,'RespId1',0);
    cy.enterTextAndVerifyWithValue(UserPage.collaborationPlanResourcesId,'ResourId1',0);
    cy.contains('span','Collaboration Plan').click();
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and delete Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify modal message while deletion of existing Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm');
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Collaboration Plan?');
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  // Assessor Action Opportunities Test Cases

  it('Should Assessor can login and verify the validation message for mandatory fields of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 0, 'My Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 1, 'Opportunities');
    cy.verifyPageContent(UserPage.myOpportunitieslabelId, 2, 'Add New');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId);
    cy.verifyPageContent(UserPage.myOpportunitiesErrorId, 0, 'Please enter opportunity name');
    cy.verifyPageContent(UserPage.myOpportunitiesErrorId, 1, 'Please enter account name');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and add new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and edit new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesMandInputsAndVerify(UserPage, opportunityName);
    cy.editNewOpportunitiesAndVerify(UserPage, opportunityName);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and delete new opportunity of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesMandInputsAndVerify(UserPage, opportunityName);
    cy.deleteNewOpportunitiesAndVerify(UserPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel1Id, 0, 'Key Players');
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify default form for new Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanAddNewDefaultFormId,'not.exist');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanAddNewDefaultFormId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanEventNameId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanResponsibleId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanResourcesId,'be.exist');
    cy.verifyElementExistOrNot(UserPage.collaborationPlanSaveActivityId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify cancel functionality on Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify validation message for Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContent(UserPage.collaborationPlanErrorMessId, 0, 'Please enter an event name');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and add Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and update Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanResponsibleId,'0','');
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanResourcesId,'0','');
    cy.enterTextAndVerifyWithValue(UserPage.collaborationPlanResponsibleId,'RespId1',0);
    cy.enterTextAndVerifyWithValue(UserPage.collaborationPlanResourcesId,'ResourId1',0);
    cy.contains('span','Collaboration Plan').click();
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and delete Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify modal message while deletion of existing Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.enterEventNameCollaborationPlan(UserPage.collaborationPlanEventNameId,'Event1');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContentUsingValue(UserPage.collaborationPlanEventNameId,'0','Event1');
    cy.clickButton(UserPage.collaborationPlanCancelId,0);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm');
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Collaboration Plan?');
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanExistingPlanId,'not.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify default form for new Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel1Id, 0, 'Pain:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel2Id, 0, 'Value:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel3Id, 0, 'Power:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel4Id, 0, 'Collaborate:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel5Id, 0, 'Vision:');
    cy.verifyPageContent(UserPage.strengthSalesChecksLabel6Id, 0, 'Compelling Reason to Act:');
    cy.verifyElementExistOrNot(UserPage.strengthSalesChecksSelectOptionId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify cancel functionality on Collaboration Plan of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId);
    cy.verifyUrl('/sales_checks');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and add Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and update Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifySelectedOptionOnStrengthChecks(UserPage);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.strengthSalesChecksItemId,0);
    cy.verifyUpdatedItemData(UserPage);
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and delete Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.verifySelectedOptionOnStrengthChecks(UserPage);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.strengthSalesCheckDateId, 0,Cypress.moment().format('MMM DD, YYYY'));
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify modal message while deletion of existing Strength Sales Check of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName);
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 0, 'Collaboration Plan');
    cy.verifyPageContent(UserPage.myOpportunitiesOtherDetailsTextId, 1, 'Strength of Sale Check');
    cy.clickButton(UserPage.myOpportunitiesOtherDetailsLinkId,1);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.clickButton(UserPage.collaborationPlanAddNewId,0);
    cy.verifyUrl('sales_checks/new');
    cy.clickButton(UserPage.collaborationPlanSaveActivityId,0);
    cy.verifyElementExistOrNot(UserPage.collaborationPlanDeleteButtonId,'be.exist');
    cy.clickButton(UserPage.collaborationPlanDeleteButtonId,0);
    cy.verifyPageContent(UserPage.collaborationPlanModalHeaderTitleId,0,'Confirm');
    cy.verifyPageContent(UserPage.collaborationPlanModalMessageId,0,'Are you sure you would like to delete this Strength of Sale Check?');
    cy.clickButton(UserPage.collaborationPlanModalButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel1Id, 0, 'Strength of Sale Check');
    cy.verifyPageContent(UserPage.opportunitiesDetailsLabel2Id, 0, 'Add New');
    cy.deleteExistingOpportunities(UserPage, opportunityName);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify the cancel button functionality for \'My opportunity\' in \'Sales Tools\' ', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.clickButton(UserPage.opportunitiesCancelButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesAddNewLinkId, 0, 'Add New');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify the cancel button functionality for \'My opportunity\' in \'Sales Tools\' ', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId);
    cy.clickButton(UserPage.opportunitiesCancelButtonId,0);
    cy.verifyPageContent(UserPage.opportunitiesAddNewLinkId, 0, 'Add New');
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify validation message for new Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId); // click on Key Players save button
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,0,'Please select target Industry'); // verify validation message
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,1,'Please select target Job Role');
    cy.verifyPageContent(UserPage.keyPlayerValidationLabelId,2,'Please select Pain for this Key Player');
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and verify cancel functionality for new Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId); // click on Key Players Cancel Button
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Key Players Add New button
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify new added Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.verifyCreatedKeyPLayers(UserPage); // submit the form and verify details for created key player
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Manager can login and add Reason in Pain section for Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, firstName +' '+ lastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId);
    cy.enterReasonForKeyPlayer(UserPage); // select Reason option
    cy.verifyElementExistOrNot(UserPage.keyPlayersReasonQuestionId,'be.exist'); // verify question block
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and verify cancel functionality for new Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.clickUsingXpath(UserPage.strengthSalesChecksCancelButtonId); // click on Key Players Cancel Button
    cy.verifyPageContent(UserPage.keyPlayersDetailsLabel2Id, 0, 'Add New'); // verify Key Players Add New button
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should Assessor can login and add Reason in Pain section for Key Players of \'My Opportunities\' in \'Sales Tools\'', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage, emailAddressSecondUser);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyUserNameOnAssessAfterlogin(UserPage, secondUserfirstName +' '+ secondUserlastName);
    cy.dismissAssessPopup(UserPage);
    cy.clickButton(UserPage.salesToolNavLinkId, 2);
    cy.verifyUrl('/sales_tools/opportunities');
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on My Opportunities Add New button
    cy.enterNewOpportunitiesInputsAndVerify(UserPage, opportunityName); // enter Opportunities Details
    cy.clickUsingXpath(UserPage.myOpportunitiesAddNewId); // click on Key Players Add New Button
    cy.selectOptionFromSelectElement(UserPage.keyPlayerTargetIndustryId,'1'); // select 1st option using index for target industry field
    cy.selectOptionFromSelectElement(UserPage.keyPlayerJobRoleId,'1'); // select 1st option using index for job role field
    cy.enterPainForKeyPlayer(UserPage); // select pain option
    cy.clickUsingXpath(UserPage.myOpportunitiesSaveButtonId);
    cy.enterReasonForKeyPlayer(UserPage); // select Reason option
    cy.verifyElementExistOrNot(UserPage.keyPlayersReasonQuestionId,'be.exist'); // verify question block
    cy.deleteExistingOpportunities(UserPage, opportunityName); // delete created Opportunity
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Logout');
  });

  it('Should delete new learnig user collection', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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


  it('Should delete the learning plan in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Plans');
    cy.verifyUrl('/learning_plans');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningTitleText);
    cy.contains(learningName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, LearningData.successMessageForDeleteLearning);
  });

  it('Should delete Assessment user collection in knowledge assessment in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(knowledgeAssessmentName).click({force:true});
    cy.clickAssessmentUserCollectionLinkInTable(AssessmentPage, 0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, AssessmentData.deletedAssessmentUserCollectionSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete knowledge assessment in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 2);
    cy.clickDropdownMenuItem(UserPage,'Knowledge Assessments');
    cy.verifyUrl('/knowledge_assessments');
    cy.verifyPageTitle(AccountPage.accountTitleId, AssessmentData.assessmentTitleText);
    cy.contains(knowledgeAssessmentName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.sucessAlertId, AssessmentData.deleteAssessmentSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete Assessment user collection in behavior assessment of \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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

  it('Should delete behavior assessment in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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

  it('Should delete the created assessment period in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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

  it('Should Delete the territories  in \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.contains(territorName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,TerritorData.successMessageForDeleteTerritor);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete new business in \'LearnCo\' account', () => {
   cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
   cy.clickSearchIcon(AccountPage); // click on search searchIcon
   cy.verifySearchResult(AccountPage); // Verify the result for specific account
   cy.openAccountUsingLink(AccountPage,0); // click on account link by index
   cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
   cy.clickDropdown(UserPage, 1);
   cy.clickDropdownMenuItem(UserPage,'Business Unit');
   cy.verifyUrl('/business_units');
   cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
   cy.contains(parentBusinessUnitName).click({force:true});
   cy.clickOnDeleteButton(AccountPage);
   cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForDeleteBusiness);
   cy.clickNavBarDropDownButton(LoginPage);
   cy.clickSignOutOption('Sign out');
 });

  it('Should delete second created sales role in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.enterUserSearchData(UserPage, secondSalesName); //input data in search field
    cy.clickSearchIcon(AccountPage);
    cy.verifySearchResult(AccountPage);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForDeleteSales);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete created the sales role in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete the second created user collection in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User Collections');
    cy.verifyUrl('/user_collections');
    cy.verifyPageTitle(AccountPage.accountTitleId, UserCollectionData.usercollectionTitleText);
    cy.enterUserSearchData(UserPage, secondUserCollectionName);
    cy.clickSearchIcon(AccountPage);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, UserCollectionData.successMessageForDeleteNewUserCollectionText);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete the created user collection in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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

  it('Should delete the created user in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, emailAddressSecondUser); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userDeleteSuccessMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should delete the second created user in \'Learnco\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
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
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });

  it('Should update the license and locked checkbox \'LearnCo\' account', () => {
    cy.enterSearchData(AccountPage, 'LearnCo'); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'LearnCo');
    cy.clickOnEditButton(AccountPage);
    cy.enterLicensedValue(UserPage, '40');
    cy.checkedAccountLockCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });
});
