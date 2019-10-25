import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';
import { TerritorData} from '../../support/Base/PageData/TerritoriesData.js';
import { TerritorPage} from '../../support/Base/PageObjects/TerritoriesObject.js';
import { BusinessData} from '../../support/Base/PageData/BusinessData.js';
import { BusinessPage} from '../../support/Base/PageObjects/BusinessUnitObject.js';

const faker = require('faker');

describe('Business Unit Test Cases', () => {

  const businessUnitName = "Business_Unit" +faker.random.number();
  const updatedBusinessUnitName = "Business_Unit" +faker.random.number();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const password = 'Testing@123'
  const parentBusinessUnitName = "Parent_Business_Unit" +faker.random.number();

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

  it('Should Create a parent business unit in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
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
  });

  it('Should Create a new Business Unit with blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/business_units/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,BusinessData.validationMessageForBusinessBlankField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,BusinessData.invalidFeedbackMessageForBusinessParentField, 1);
  });

  it('Should Create a new business with name only in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/business_units/new');
    cy.enterBusinessUnitName(BusinessPage, businessUnitName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,BusinessData.validationMessageForBusinessParentField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,BusinessData.invalidFeedbackMessageForBusinessParentField, 0);
  });

  it('Should Create a new business with parent unit only in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/business_units/new');
    cy.selectBusinessUnitParentDropdownValue(BusinessPage, parentBusinessUnitName)
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,BusinessData.validationMessageForBusinessUnitNameField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should Create a new business in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/business_units/new');
    cy.enterBusinessUnitName(BusinessPage, businessUnitName);
    cy.selectBusinessUnitParentDropdownValue(BusinessPage, parentBusinessUnitName)
    cy.clickSaveButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForNewBusiness);
  });

  it('Should verify number of user count when user is not added in business_units \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.verifyNumberOfUserCountInTerritory(BusinessPage, businessUnitName, 0);
  });

  it('Should Edit new business in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.contains(businessUnitName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.enterBusinessUnitName(BusinessPage, updatedBusinessUnitName);
    cy.clickSaveButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForEditBusiness);
  });

  it('Should verify the message when user is not added in business unit of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.contains(updatedBusinessUnitName).click({force:true});
    cy.verifyMessage(TerritorPage.territorUserTableDisplayMessageId,TerritorData.displayMessageInUserTableTerritor);
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
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 6, updatedBusinessUnitName);
    cy.selectDropdownValue(UserPage, 7, 'English');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
  });

  it('Should verify number of user count when user is added in business_units of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.verifyNumberOfUserCountInTerritory(BusinessPage, updatedBusinessUnitName, 1);
  });

  it('Should verify the added User name in business unit of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.contains(updatedBusinessUnitName).click({force:true});
    cy.verifyUserInTerritoryTable(TerritorPage, firstName+' '+lastName);
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

  it('Should delete new business unit in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.contains(updatedBusinessUnitName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForDeleteBusiness);
  });

  it('Should delete parent business unit in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Business Unit');
    cy.verifyUrl('/business_units');
    cy.verifyPageTitle(AccountPage.accountTitleId,BusinessData.businessTitleText);
    cy.contains(parentBusinessUnitName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,BusinessData.successMessageForDeleteBusiness);
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
