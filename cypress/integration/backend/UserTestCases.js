import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';

const faker = require('faker');

describe('User Test Cases', () => {

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const updatedEmailAddress = faker.internet.email();
  const password = 'Testing@123';
  const password1 = 'Testing@1234';
  const shortPassword = faker.internet.password(6);
  const invalidPassword = 'testingqasac'
  const fileName = 'example.xlsx';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

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

  it('Should verify the user list of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
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

  it('Should verify all mandatory field validation message to create new user with blank fields', () => {
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
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.validationMessage,UserData.validationMessageForNewUserBlankField);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should verify Email and LastName field validation message to create new user with first name', () => {
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
    cy.enterUserFirstName(UserPage, firstName);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.validationMessage,UserData.validationMessageForEmailAndLastBlankField);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should verify Email field validation message to create new user with first name and last name', () => {
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
    cy.enterUserFirstName(UserPage, firstName);
    cy.enterUserLastName(UserPage, lastName);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.validationMessage,UserData.validationMessageForEmailBlankField);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should verify password field note message to create new user', () => {
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
    cy.verifyPasswordFieldValidationMessage(UserPage.passwordNoteId,UserData.passwordNote);
  });

  it('Should verify password field validation message when password is less than eight character', () => {
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
    cy.selectMultipleDropdownValue(UserPage, 3, 'Marketing', 'Sellers');
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales', 'Outside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'German');
    cy.enterUserNewPassword(UserPage, shortPassword);
    cy.enterUserConfirmPassword(UserPage,shortPassword);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,UserData.shortPasswordInvalidFeedback);
  });

  it('Should verify password field validation message when password format is invalid for create new user', () => {
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
    cy.selectMultipleDropdownValue(UserPage, 3, 'Marketing', 'Sellers');
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales', 'Outside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'German');
    cy.enterUserNewPassword(UserPage,invalidPassword);
    cy.enterUserConfirmPassword(UserPage,invalidPassword);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,UserData.passwordInvalidFeedback);
  });

  it('Should verify confimation password field validation message when confirm password field is empty for create new user', () => {
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
    cy.selectMultipleDropdownValue(UserPage, 3, 'Marketing', 'Sellers');
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales', 'Outside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'German');
    cy.enterUserNewPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,UserData.passwordCofirmationInvalidFeedback);
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
    cy.selectMultipleDropdownValue(UserPage, 3, 'Marketing', 'Sellers');
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales', 'Outside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'German');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
  });

  it('Should create a new user with existing email address in \'Acme\' account', () => {
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
    cy.selectMultipleDropdownValue(UserPage, 3, 'Marketing', 'Sellers');
    cy.selectMultipleDropdownValue(UserPage, 4, 'Inside Sales', 'Outside Sales');
    cy.selectDropdownValue(UserPage, 5, 'Europe');
    cy.selectDropdownValue(UserPage, 7, 'German');
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifyValidationMessage(AccountPage.validationMessage,UserData.existingEmailAddressValidation);
  });

  it('Should verify the default login count', () => {
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
    cy.verifyUserLoginCount(UserPage, 0);
  });

  it('Should verify login count after new user login', () => {
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
    cy.enterEmail(LoginPage,emailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.clickNewUserDropdownNavItem(LoginPage);
    cy.clickSignOutOption('Abmelden');
    cy.enterEmail(LoginPage,LoginData.email);
    cy.enterPassword(LoginPage,LoginData.password);
    cy.loginButton(LoginPage);
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
    cy.verifyUserLoginCount(UserPage, 1);
  });

  it('Should search the user with language in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.clickSearchDownCaretButton(UserPage);
    cy.clickSearchFieldReactSelctDropdown(UserPage, 1, 'German');
    cy.clickUserSearchIconByIndex(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
  });

  it('Should search the user with all option in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.clickSearchDownCaretButton(UserPage);
    cy.clickSearchFieldReactSelctDropdown(UserPage, 0, 'active');
    cy.clickSearchFieldReactSelctDropdown(UserPage, 1, 'German');
    cy.clickSearchFieldReactSelctDropdown(UserPage, 2, 'Inside Sales');
    cy.clickSearchFieldReactSelctDropdown(UserPage, 3, 'Marketing');
    cy.clickSearchFieldReactSelctDropdown(UserPage, 4, 'Bill Jenkins');
    cy.clickUserSearchIconByIndex(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
  });

  it('Should edit the user with previous password in \'Acme\' account', () => {
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
    cy.enterUserEmail(UserPage, updatedEmailAddress);
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage, UserData.validationMessageForPreviousPassword);
  });

  it('Should edit the user in \'Acme\' account', () => {
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
    cy.enterUserEmail(UserPage, updatedEmailAddress);
    cy.enterUserNewPassword(UserPage, password1);
    cy.enterUserConfirmPassword(UserPage, password1);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userUpdateSuccessMessage);
  });

  it('Should verify the updated user in a table', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, updatedEmailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
  });

  it('Should cancel the user edit form in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, updatedEmailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnEditButton(AccountPage);
    cy.clickOnCancelButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
  });

  it('Export users file in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.exportUserStatistic(AccountPage.exportStatisticButton, 0, 'export_account_setup'); //verify the status of export statistic file
  });

  it('Export login statistic file in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.exportUserStatistic(AccountPage.exportStatisticButton, 1, 'export_login_statistics'); //verify the status of export statistic file
  });

  it('Should search a specific user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, updatedEmailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
  });

  it('Should import a user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.clickImportUsersButton(UserPage);
    cy.upload_file(fileName, fileType);
    cy.clickSaveButton(AccountPage);
  });

  it('Should download template for user in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.clickImportUsersButton(UserPage);
    cy.verifyDownloadTemplateFileHref(UserPage, '/admin/accounts/1/import/users.xlsx');
  });

  it('Should close a import user window in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.clickImportUsersButton(UserPage);
    cy.clickModelFooterCloseButton(UserPage);
    cy.verifyImportUserWindowClose(UserPage);
  });

  it('Should verify the Bulk edit form in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.verifyBulkEditButtonDisable(UserPage);
    cy.selectAllCheckbox(UserPage);
    cy.clickBilkEditButton(UserPage);
    cy.verifyWarningMessageOnBulkEditForm(UserPage, UserData.warningMessageInBulkEditForm);
  });

  it('Should Cancel the Bulk edit form in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.verifyBulkEditButtonDisable(UserPage);
    cy.selectAllCheckbox(UserPage);
    cy.clickBilkEditButton(UserPage);
    cy.verifyWarningMessageOnBulkEditForm(UserPage, UserData.warningMessageInBulkEditForm);
    cy.clickCancelButtonBulkEditForm(UserPage);
    cy.verifyBulkEditFormIsStillOpen(UserPage);
  });

  it('Should verify Send Initial Confirmation Emails button is disabled in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.verifyDisableButton(UserPage.sendInitialConfirmationEmailButtonId, 0);
  });

  it('Should verify Resend confirmation email button is disabled in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.verifyDisableButton(UserPage.resendConfirmationEmailButtonId, 0);
  });

  it('Should user can login as user', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.enterUserSearchData(UserPage, updatedEmailAddress); //input data in search field
    cy.clickUserSearchIcon(UserPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.verifySearchedCreteraiMessage(UserPage, UserData.searchCreteriaText);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickLoginAsUserButton(UserPage);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyLoginAsUserInTopStripe(UserPage, updatedEmailAddress);
    cy.clickOnUserReturnButton(UserPage);
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
    cy.enterUserSearchData(UserPage, updatedEmailAddress); //input data in search field
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
