import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserData} from '../../support/Base/PageData/UserData.js';
import { SalesData} from '../../support/Base/PageData/SalesData.js';
import { SalesPage} from '../../support/Base/PageObjects/SalesObject.js';

const faker = require('faker');

describe('Sales Test Cases', () => {
  const salesName = 'Sales'+faker.random.number();
  const updatedSalesName = 'Sales'+faker.random.number();
  const metricName = 'Metric'+faker.random.number();
  const updatedMetricName = 'Metric'+faker.random.number();
  const invalidSalesName = 'Sales'+faker.random.number();

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

  it('Should search a sales role in \'Acme\' account with invalid date', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 1);
    cy.clickDropdownMenuItem(UserPage,'Sales Roles');
    cy.verifyUrl('/sales_roles');
    cy.verifyPageTitle(AccountPage.accountTitleId, SalesData.salesTitleText);
    cy.enterUserSearchData(UserPage, invalidSalesName); //input data in search field
    cy.clickSearchIcon(AccountPage);
    cy.verifyMessage(SalesPage.noSearchMessageId, SalesData.noSearchResultText+invalidSalesName);
  });

  it('Should verify validation message when user create new sales role with blank name in \'Acme\' account', () => {
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
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,SalesData.validationMessageForNameBlankField);
    cy.verifyValidationMessage(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage);
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

  it('Should create a Growth Aligned Goals for created sales in \'Acme\' account with all blank field', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickGrowthAlignedGoalNewButton(SalesPage);
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 0, SalesData.validationMessageforSelectMetric);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 1, SalesData.validationMessageforMetricName);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 2, SalesData.validationMessageforMetricGoalType);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 3, SalesData.validationMessageforMetricGoalValue);
    cy.clickModelFooterButton(UserPage, 0);
  });

  it('Should create a Growth Aligned Goals for created sales in \'Acme\' account with only metric select Id', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickGrowthAlignedGoalNewButton(SalesPage);
    cy.selectMetricOption(SalesPage, '# of Opportunities');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 0, SalesData.validationMessageforMetricName);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 1, SalesData.validationMessageforMetricGoalValue);
    cy.clickModelFooterButton(UserPage, 0);
  });

  it('Should create a Growth Aligned Goals for created sales in \'Acme\' account with metric select Id and Name', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickGrowthAlignedGoalNewButton(SalesPage);
    cy.selectMetricOption(SalesPage, '# of Opportunities');
    cy.enterMetricDisplayName(SalesPage, metricName);
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyErrorMessageInGrowthAlignedGoalPopup(SalesPage, 0, SalesData.validationMessageforMetricGoalValue);
    cy.clickModelFooterButton(UserPage, 0);
  });

  it('Should create a Growth Aligned Goals for created sales in \'Acme\' account', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickGrowthAlignedGoalNewButton(SalesPage);
    cy.verifyGrowthAlignedGoalPopupText(SalesPage,SalesData.growthAlignedGoalPopupText);
    cy.selectMetricOption(SalesPage, '# of Opportunities');
    cy.enterMetricDisplayName(SalesPage, metricName);
    cy.enterGoalValue(SalesPage, '40');
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricNameInTable(SalesPage, metricName);
  });

  it('Should edit a Growth Aligned Goals for creates sales in \'Acme\' account', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickOnMetricEditButton(SalesPage);
    cy.enterMetricDisplayName(SalesPage, updatedMetricName);
    cy.clickModelFooterButton(UserPage, 2);
    cy.verifyMetricNameInTable(SalesPage, updatedMetricName);
  });

  it('Should delete a Growth Aligned Goals for creates sales in \'Acme\' account', () => {
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
    cy.clickGrowthAlignedGoalDropdownIcon(SalesPage);
    cy.clickOnMetricEditButton(SalesPage);
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifyMetricVisibleAfterDelete(SalesPage);
  });

  it('Should add new user for creates sales in \'Acme\' account', () => {
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
    cy.clickUserCollectionButton(SalesPage, 2);
    cy.enterUserNameInAddUserPopupSearchField(SalesPage, 'Bill');
    cy.clickSearchButtonOnAddUserPopup(SalesPage);
    cy.selectCheckboxOnAddUserPopup(SalesPage);
    cy.clickAddSelectedUserButton(SalesPage);
    cy.verifySuccessMessageForAddSelectedUser(SalesPage);
  });

  it('Should search a invalid user  for creates sales in \'Acme\' account', () => {
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
    cy.searchUserInUserGroup(SalesPage, salesName);
    cy.clickUserCollectionButton(SalesPage, 3);
    cy.verifyMessage(SalesPage.noUserInUserGroupId, SalesData.noSearchTextInUserGroup);
  });

  it('Should search a added user  for creates sales in \'Acme\' account', () => {
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
    cy.searchAddedUserForSales(SalesPage);
    cy.clickUserCollectionButton(SalesPage, 3);
    cy.verifySearchResultOfUserCollection(SalesPage);
  });

  it('Should delete selected user collection for creates sales in \'Acme\' account', () => {
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
    cy.selectUserCollectionCheckbox(SalesPage, 0);
    cy.clickUserCollectionButton(SalesPage, 0);
    cy.verifySuccessMessageForUserSales(SalesPage, SalesData.successMessageOfDeletedSelectedUser);
  });

  it('Should delete all user collection for creates sales in \'Acme\' account', () => {
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
    cy.clickUserCollectionButton(SalesPage, 1);
    cy.clickModelFooterButton(UserPage, 1);
    cy.verifySuccessMessageForUserSales(SalesPage, SalesData.successMessageOfDeletedSelectedUser);
  });

  it('Should search a specific sales role in \'Acme\' account', () => {
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
    cy.verifySalesName(AccountPage.accountLink, salesName);
  });

  it('Should cancel the edit sales role form in \'Acme\' account', () => {
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
    cy.clickOnEditButton(AccountPage);
    cy.clickOnCancelButton(AccountPage);
    cy.verifyCancelButtonShouldNotVisible(AccountPage.cancelButton);
  });

  it('Should edit the sales role in \'Acme\' account', () => {
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
    cy.clickOnEditButton(AccountPage);
    cy.enterSalesName(SalesPage, updatedSalesName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForEditUSales);
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
    cy.enterUserSearchData(UserPage, updatedSalesName); //input data in search field
    cy.clickSearchIcon(AccountPage);
    cy.verifySearchResult(AccountPage);
    cy.openAccountUsingLink(AccountPage,0);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessMessageForNewSales(SalesPage, SalesData.successMessageForDeleteSales);
  });
});
