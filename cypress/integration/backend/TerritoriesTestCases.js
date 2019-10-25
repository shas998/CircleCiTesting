import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';
import { TerritorData} from '../../support/Base/PageData/TerritoriesData.js';
import { TerritorPage} from '../../support/Base/PageObjects/TerritoriesObject.js';

const faker = require('faker');

describe('Territory Test Cases', () => {

  const territorName = "Territory" +faker.random.number();
  const updatedTerritorName = "Territory" +faker.random.number();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const password = 'Testing@123'

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

  it('Should Create a new territories with blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/territories/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,TerritorData.validationMessageForTerritorBlankField);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,TerritorData.invalidFeedbackMessageForParentField, 1);
  });

  it('Should Create a new territories with only name in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/territories/new');
    cy.enterTerritoryName(TerritorPage, territorName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,TerritorData.validationMessageForTerritorParentField);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,TerritorData.invalidFeedbackMessageForParentField);
  });

  it('Should Create a new territories with only parent in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/territories/new');
    cy.selectTerritorParentDropdownValue(TerritorPage, 'Europe');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,TerritorData.territorValidationMessageForName);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should Create a new territories in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
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
  });

  it('Should Edit the territories  in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.contains(territorName).click({force:true});
    cy.clickOnEditButton(AccountPage);
    cy.enterTerritoryName(TerritorPage, updatedTerritorName);
    cy.clickSaveButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,TerritorData.successMessageForEditTerritor);
  });

  it('Should verify number of user count when user is not added in territories of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.verifyNumberOfUserCountInTerritory(TerritorPage, updatedTerritorName, 0);
  });

  it('Should verify the message when user is not added in territories of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.contains(updatedTerritorName).click({force:true});
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
    cy.selectDropdownValue(UserPage, 5, updatedTerritorName);
    cy.selectDropdownValue(UserPage, 7, 'English');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
  });

  it('Should verify number of user count when user is added in territories of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.verifyNumberOfUserCountInTerritory(TerritorPage, updatedTerritorName, 1);
  });

  it('Should verify the added User name in territories of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.contains(updatedTerritorName).click({force:true});
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

  it('Should Delete the territories  in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Territories');
    cy.verifyUrl('/territories');
    cy.verifyPageTitle(AccountPage.accountTitleId,TerritorData.territorTitleText);
    cy.contains(updatedTerritorName).click({force:true});
    cy.clickOnDeleteButton(AccountPage);
    cy.verifyMessage(AccountPage.sucessAlertId,TerritorData.successMessageForDeleteTerritor);
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
