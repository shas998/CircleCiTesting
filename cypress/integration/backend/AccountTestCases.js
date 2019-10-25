import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';

const faker = require('faker');
import 'cypress-file-upload';

describe('Accounts Test Cases', () => {

  const name = faker.name.findName();
  const updatedName = faker.name.findName();
  const todayDate = Cypress.moment().format('YYYY-MM-DD');
  const fileName = 'spi_logo2.jpg';
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const emailAddress = faker.internet.email();
  const emailAddress1 = faker.internet.email();
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

  it('Should cancel account form and verify account page', () => {
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/accounts/new');
    cy.clickOnCancelButton(AccountPage);
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountText);
  });

  it('Should verify validation message and invalid-feedback to create new account with blank fields', () => {
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/accounts/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AccountData.validationMessageForNewAccountBlankFields);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
  });

  it('Should create a new account without image logo', () => {
    cy.clickNewButton(AccountPage); // click on New button
    cy.verifyUrl('/accounts/new');
    cy.enterAccountName(AccountPage, name);
    cy.enterLicensedValue(UserPage, '40');
    cy.enterAccountLicenseDate(AccountPage, todayDate);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successMessage);
  });

  it('Should add a logo in created account', () => {
    cy.enterSearchData(AccountPage,name); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+name);
    cy.clickOnEditButton(AccountPage);
    cy.fixture(fileName, 'base64').then(fileContent => {
      cy.get(AccountPage.inputFileField).eq(0).upload(
        { fileContent, fileName, mimeType: 'image/jpg' },
        { subjectType: 'input' },
      )
    })
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
    cy.verifyImageName(AccountPage.logoImageId, fileName)
  });

  it('Should verify and delete a logo in created account', () => {
    cy.enterSearchData(AccountPage,name); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+name);
    cy.clickOnEditButton(AccountPage);
    cy.clickOnImageCloseIcon(AccountPage);
    cy.verifyImageCloseIcon(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });

  it('Should search a specific account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
  });

  it('Should change the status(inactive) of account', () => {
    cy.enterSearchData(AccountPage,name); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+name);
    cy.clickOnEditButton(AccountPage);
    cy.selectAccountStatus(AccountPage, 'inactive');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });

  it('Should verify inactive account appear after select the \'Show Inactive Accounts\' checkbox', () => {
    cy.clickInactiveAccountCheckbox(AccountPage);
    cy.verifyInactiveAccountInTable(AccountPage, 5, name,'inactive');
  });
  
  it('Should edit the account and verify the success message', () => {
    cy.clickInactiveAccountCheckbox(AccountPage);
    cy.enterSearchData(AccountPage,name); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.clickInactiveAccountCheckbox(AccountPage);
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+name);
    cy.clickOnEditButton(AccountPage);
    cy.enterAccountName(AccountPage, updatedName);
    cy.selectAccountStatus(AccountPage, 'active');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
  });

  it('Should verify the inactive user count in account', () => {
    cy.enterSearchData(AccountPage,updatedName); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifyInactiveAccountInTable(AccountPage, 11, updatedName,'0');
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+updatedName);
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'User list');
    cy.verifyUrl('/users');
    cy.verifyPageTitle(AccountPage.accountTitleId,UserData.userTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/users/new');
    cy.selectDropdownValue(UserPage, 0, 'User');
    cy.selectDropdownValue(UserPage, 1, 'Inactive');
    cy.enterUserFirstName(UserPage, firstName);
    cy.enterUserLastName(UserPage, lastName);
    cy.enterUserEmail(UserPage, emailAddress);
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
    cy.visit('');
    cy.verifyInactiveAccountInTable(AccountPage, 11, updatedName,'1');
  });

  it('Should verify the active user count in account', () => {
    cy.enterSearchData(AccountPage,updatedName); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifyInactiveAccountInTable(AccountPage, 10, updatedName,'0');
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+updatedName);
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
    cy.enterUserEmail(UserPage, emailAddress1);
    cy.enterUserNewPassword(UserPage, password);
    cy.enterUserConfirmPassword(UserPage, password);
    cy.clickSaveButton(AccountPage);
    cy.verifyPageTitle(UserPage.warningModelId,UserData.warningModelTitleText);
    cy.clickModelFooterButton(UserPage, 0);
    cy.verifySuccessMessageForNewUser(UserPage, UserData.userSuccessMessage);
    cy.visit('');
    cy.verifyInactiveAccountInTable(AccountPage, 10, updatedName,'1');
  });

  it('Should verify total users in account', () => {
    cy.verifyInactiveAccountInTable(AccountPage, 9, updatedName,'2');
  });

  it('Should verify "SPI Client?" value in account table when it is checked', () => {
    cy.verifyInactiveAccountInTable(AccountPage, 6, updatedName,'Yes');
  });

  it('Should verify "SPI Client?" value in account table when it is unchecked', () => {
    cy.clickInactiveAccountCheckbox(AccountPage);
    cy.enterSearchData(AccountPage,updatedName); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.clickInactiveAccountCheckbox(AccountPage);
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+updatedName);
    cy.clickOnEditButton(AccountPage);
    cy.clickSpiClientCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
    cy.visit('');
    cy.verifyInactiveAccountInTable(AccountPage, 6, updatedName,'No');
  });

  it('Should verify validation message for deletion of locked account', () => {
    cy.enterSearchData(AccountPage,updatedName); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+updatedName);
    cy.clickOnDeleteButton(AccountPage);
    cy.enterAuthenticationPassword(AccountPage, LoginData.password)
    cy.clickAuthenticationPasswordSubmitButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,AccountData.deleteLockedAccountMessage);
  });

  it('Should verify success message for deletion of account', () => {
    cy.enterSearchData(AccountPage,updatedName); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+updatedName);
    cy.clickOnEditButton(AccountPage);
    cy.uncheckAccoutLockedCheckbox(AccountPage);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successUpdateMessage);
    cy.clickOnDeleteButton(AccountPage);
    cy.enterAuthenticationPassword(AccountPage, LoginData.password)
    cy.clickAuthenticationPasswordSubmitButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, AccountData.successDeleteMessage);
  });

  it('Should export the statistic file', () => {
    cy.exportStatistic(AccountPage, 'accounts.xlsx'); //verify the status of export statistic file
  });
});
