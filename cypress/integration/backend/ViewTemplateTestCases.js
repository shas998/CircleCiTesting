import { LoginPage} from '../../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../../support/Base/PageData/LoginData.js';
import { AccountPage} from '../../support/Base/PageObjects/AccountObject.js';
import { AccountData} from '../../support/Base/PageData/AccountData.js';
import { ViewTemplatePage} from '../../support/Base/PageObjects/ViewTemplateObject.js';
import { ViewTemplateData} from '../../support/Base/PageData/ViewTemplateData.js';
import { AssessmentPage} from '../../support/Base/PageObjects/AssessmentObject.js';
import { AssessmentData} from '../../support/Base/PageData/AssessmentData.js';
const faker = require('faker');

describe('View Template Test Cases', () => {

  const templateName = "view_template" +faker.random.number();
  const templateSubject = "Subject" +faker.random.number();
  const messageName = "assess_welcome_message" +faker.random.number();
  const messageSubject = "assess_welcome_message subject" +faker.random.number(); 
  const emailName = "ja Acme: added_to_learning_plan" +faker.random.number();
  const emailSubject = "ja Acme: added_to_learning_plan subject" +faker.random.number();

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

it('Should create a new view template with all blank fields', () => {
  cy.clickNavIconToggelButton(ViewTemplatePage.navBarToggelButtonId);
  cy.clickNavMenuLink(ViewTemplatePage.navMenuLinkId, 11);
  cy.verifyPageTitle(AccountPage.accountTitleId,ViewTemplateData.viewTemplateTitleText);
  cy.clickNewButton(AccountPage); // click on New button
  cy.verifyUrl('/view_templates/new');
  cy.clickSaveButton(AccountPage);
  cy.verifyValidationMessage(AccountPage.validationMessage,ViewTemplateData.validationMessageForTemplateBlankField);
  cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,ViewTemplateData.invalidFeedbackMessageForCodeId, 1);
  cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 2);
});

it('Should create a new view template with only Name field', () => {
  cy.clickNavIconToggelButton(ViewTemplatePage.navBarToggelButtonId);
  cy.clickNavMenuLink(ViewTemplatePage.navMenuLinkId, 11);
  cy.verifyPageTitle(AccountPage.accountTitleId,ViewTemplateData.viewTemplateTitleText);
  cy.clickNewButton(AccountPage); // click on New button
  cy.verifyUrl('/view_templates/new');
  cy.enterViewTemplateName(ViewTemplatePage,templateName);
  cy.clickSaveButton(AccountPage);
  cy.verifyValidationMessage(AccountPage.validationMessage,ViewTemplateData.validationMessageForTemplateCodeIdAndSubject);
  cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,ViewTemplateData.invalidFeedbackMessageForCodeId, 0);
  cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
});

it('Should add new language in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.addNewLanguageButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'ja');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit added language with name and subject in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.enterViewTemplateName(ViewTemplatePage,templateName);
  cy.enterViewTemplateSubject(ViewTemplatePage, templateSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should preview edited language in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickEditButtonOnViewTemplate('JA', 1);
  cy.verifyPageTitle(ViewTemplatePage.templatePreviewTextId, ViewTemplateData.viewTemplatePreviewText);
});

it('Should delete added language in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.deleteViewTemplateItemSucessMessage);
});


it('Should create new Role Specific Customization in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.roleSpecificCustomizationNewButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'user');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit the created Role Specific Customization in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.enterViewTemplateName(ViewTemplatePage,templateName);
  cy.enterViewTemplateSubject(ViewTemplatePage, templateSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should delete the created Role Specific Customization in existing view template', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Page Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
});

it('Should add new language in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.addNewLanguageButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'ja');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit added language with name and subject in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.enterViewTemplateName(ViewTemplatePage,messageName);
  cy.enterViewTemplateSubject(ViewTemplatePage, messageSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should preview edited language in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickEditButtonOnViewTemplate('JA', 1);
  cy.verifyPageTitle(ViewTemplatePage.templatePreviewTextId, ViewTemplateData.viewTemplatePreviewText);
});

it('Should delete added language in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.deleteViewTemplateItemSucessMessage);
});

it('Should create new Role Specific Customization in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.roleSpecificCustomizationNewButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'user');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit the created Role Specific Customization in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.enterViewTemplateName(ViewTemplatePage, messageName);
  cy.enterViewTemplateSubject(ViewTemplatePage, messageSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should delete the created Role Specific Customization in existing Message Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Message Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
});

it('Should add new language in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.addNewLanguageButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'ja');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit added language with name and subject in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.enterViewTemplateName(ViewTemplatePage, emailName);
  cy.enterViewTemplateSubject(ViewTemplatePage, emailSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should preview edited language in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickEditButtonOnViewTemplate('JA', 1);
  cy.verifyPageTitle(ViewTemplatePage.templatePreviewTextId, ViewTemplateData.viewTemplatePreviewText);
});

it('Should delete added language in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickEditButtonOnViewTemplate('JA', 0);
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.deleteViewTemplateItemSucessMessage);
});

it('Should create new Role Specific Customization in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickAddNewLanguageButton(ViewTemplatePage.roleSpecificCustomizationNewButtonId);
  cy.selectAssessmentDropdownValues(AssessmentPage,0,'user');
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should edit the created Role Specific Customization in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.enterViewTemplateName(ViewTemplatePage, emailName);
  cy.enterViewTemplateSubject(ViewTemplatePage, emailSubject);
  cy.clickSaveButton(AccountPage);
  cy.verifyMessage(AccountPage.sucessAlertId, ViewTemplateData.viewTemplateItemSucessMessage);
});

it('Should delete the created Role Specific Customization in existing Email Templates', () => {
  cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
  cy.clickSearchIcon(AccountPage); // click on search searchIcon
  cy.verifySearchResult(AccountPage); // Verify the result for specific account
  cy.openAccountUsingLink(AccountPage,0); // click on account link by index
  cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
  cy.clickViewTemplate(ViewTemplatePage.viewTemplateId);
  cy.clickExistingTemplate('Email Templates');
  cy.clickEditButtonForRoleSpecificCustomizationOnViewTemplate('User');
  cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
});

});
