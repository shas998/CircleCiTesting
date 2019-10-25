import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
const faker = require('faker');

describe('Login Test Cases', () => {
  const wrongEmailAddress = faker.internet.email();
  const password = faker.random.number();
  
  

  beforeEach(() => {
  // first thing that happens before tests
  cy.visit({
            url: '',
            headers: {
                'X-SPI-CYPRESS-CLIENT-KEY': 'e0c22c40139bc34dafcbfa7ae4aa1ebf'
            },
            followRedirect: true,
        })
	});

  afterEach(() => {
});

  it('should verify the validation message for wrong credential', () => {
    cy.verifyTitle('Spi');
    cy.enterEmail(LoginPage,wrongEmailAddress);
    cy.enterPassword(LoginPage,password);
    cy.loginButton(LoginPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LoginData.validationMessageForInvalidCredential);
  });

  it('should login successfully', () => {
    cy.verifyTitle('Spi');
    cy.enterEmail(LoginPage,LoginData.email);
    cy.enterPassword(LoginPage,LoginData.password);
    cy.loginButton(LoginPage);
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountText);
    cy.clickNavBarDropDownButton(LoginPage);
    cy.clickSignOutOption('Sign out');
  });
});
