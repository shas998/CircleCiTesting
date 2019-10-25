import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { UserPage} from '../../support/Base/PageObjects/UserObject.js';
import { UserOrgChartPage} from '../../support/Base/PageObjects/UserOrgChartObject.js';


describe('User Org Chart Test Cases', () => {

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

it('Should verify export funcationality on user org chart of \'Acme\' account', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickDropdown(UserPage, 1);
  cy.clickDropdownMenuItem(UserPage,'User Org Chart');
  cy.verifyUrl('/users_org_chart');
  cy.exportUserListFromUserOrgChart(UserOrgChartPage.exportButtonId, '/admin/accounts/1/export_users_org_chart');
});
});
