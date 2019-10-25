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

describe('Course Customization Test Cases', () => {
  const courseName = 'courseName'+faker.random.number();
  const courseDescription = 'This is a online course';
  const updatedCourseName = 'updatedCourseName'+faker.random.number();

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

  it('Should create a new course with all blank field in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.allBlankFieldValidationMessageForCourseCustomization);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 2);
  });

  it('Should create a new course with name only in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForCourseTypeAndDescription);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
  });

  it('Should create a new course with name and course type in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.selectLearningActivityFieldOption(LearningPage.courseTypeId, 'Online Course (OLT)');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForDescriptionDurationAndScorm);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should create a new course with name , course type and description in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.selectLearningActivityFieldOption(LearningPage.courseTypeId, 'Online Course (OLT)');
    cy.enterCourseDescription(LearningPage, courseDescription);
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForDurationAndScrom);
  });

  it('Should create a new course with name , course type, description and duration in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.selectLearningActivityFieldOption(LearningPage.courseTypeId, 'Online Course (OLT)');
    cy.enterCourseDescription(LearningPage, courseDescription);
    cy.enterCourseHours(LearningPage, '50');
    cy.enterCourseMinutes(LearningPage, '10');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForScrom);
  });

  it('Should create a new course with all required information in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.selectLearningActivityFieldOption(LearningPage.courseTypeId, 'Online Course (OLT)');
    cy.enterCourseDescription(LearningPage, courseDescription);
    cy.enterCourseHours(LearningPage, '5');
    cy.enterCourseMinutes(LearningPage, '10');
    cy.selectLearningActivityFieldOption(LearningPage.scormId, 'ADC - Components of EBSS: Statistical Significance & Clinical Relevance');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForCourse);
  });

  it('Should verify new course in learning activity of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Learning Activities');
    cy.verifyUrl('/course_statuses');
    cy.verifyPageTitle(AccountPage.accountTitleId, LearningData.learningActivityTitleText);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_statuses/new');
    cy.verifyCreatedCourseInLearningActivity(LearningPage, courseName+' (OLT)')
  });

  it('Should create a new course with same scorm as previous course in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickUserNewButton(AccountPage, 0);
    cy.enterCourseName(LearningPage, courseName);
    cy.selectLearningActivityFieldOption(LearningPage.courseTypeId, 'Online Course (OLT)');
    cy.enterCourseDescription(LearningPage, courseDescription);
    cy.enterCourseHours(LearningPage, '5');
    cy.enterCourseMinutes(LearningPage, '10');
    cy.selectLearningActivityFieldOption(LearningPage.scormId, 'ADC - Components of EBSS: Statistical Significance & Clinical Relevance');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForExistingScrom);
  });

  it('Should edit the course name in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, courseName, 4);
    cy.clickOnEditButton(AccountPage);
    cy.enterCourseName(LearningPage, updatedCourseName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForEditCourse);
  });

  it('Should add course mapping in course of \'Acme\' account with all blank fields', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_competencies/new');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.allBlankFieldValidationMessageForCourseMapping);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 2);
  });

  it('Should add course mapping in course of \'Acme\' account with only Competency', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_competencies/new');
    cy.selectCourseMappingDropdownValue(LearningPage, 0, 'en Acme: Demand Creation');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForPassingScoreAndWeight);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 1);
  });

  it('Should add course mapping in course of \'Acme\' account with Competency, Proficiency Level, LPAC Level and Passing Score', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_competencies/new');
    cy.selectCourseMappingDropdownValue(LearningPage, 0, 'en Acme: Demand Creation');
    cy.selectCourseMappingDropdownValue(LearningPage, 1, 'Foundational');
    cy.selectCourseMappingDropdownValue(LearningPage, 2, 'Learn');
    cy.enterCourseMappingPassingScore(LearningPage, '65');
    cy.clickSaveButton(AccountPage);
    cy.verifyValidationMessage(AccountPage.validationMessage,LearningData.validationMessageForWeight);
    cy.verifyValidationMessageByIndex(AccountPage.invalidFeedbackId,AccountData.invalidFeedbackMessage, 0);
  });

  it('Should add course mapping in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickUserNewButton(AccountPage, 0);
    cy.verifyUrl('/course_competencies/new');
    cy.selectCourseMappingDropdownValue(LearningPage, 0, 'en Acme: Demand Creation');
    cy.selectCourseMappingDropdownValue(LearningPage, 1, 'Foundational');
    cy.selectCourseMappingDropdownValue(LearningPage, 2, 'Learn');
    cy.enterCourseMappingPassingScore(LearningPage, '65');
    cy.enterCourseMappingWeight(LearningPage, '80');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForCourseCompetency);
  });

  it('Should edit course mapping in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.verifyCourseMappingTableValue(LearningPage, 'en Acme: Demand Creation', 2, 'Foundational');
    cy.verifyCourseMappingTableValue(LearningPage, 'en Acme: Demand Creation', 3, 'Learn');
    cy.clickViewButtonOfCourseMapping(LearningPage, 'en Acme: Demand Creation', 6);
    cy.wait(5000);
    cy.clickOnEditButton(AccountPage);
    cy.selectCourseMappingDropdownValue(LearningPage, 1, 'Proficient');
    cy.selectCourseMappingDropdownValue(LearningPage, 2, 'Practice');
    cy.enterCourseMappingPassingScore(LearningPage, '60');
    cy.enterCourseMappingWeight(LearningPage, '70');
    cy.clickSaveButton(AccountPage);
    cy.verifyCourseMappingTableValue(LearningPage, 'en Acme: Demand Creation', 2, 'Proficient');
    cy.verifyCourseMappingTableValue(LearningPage, 'en Acme: Demand Creation', 3, 'Practice');
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForEditCourseMapping);
  });

  it('Should delete course mapping in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickViewButtonOfCourseMapping(LearningPage, 'en Acme: Demand Creation', 6);
    cy.wait(5000);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.sucessMessageForDeleteCourseMapping);
  });

  it('Should add translation in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickUserNewButton(AccountPage, 1);
    cy.selectTranslationLocaleDropdownValue(LearningPage, 'ja');
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.sucessMessageForNewCourseTranslation);
  });

  it('Should Edit added translation in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickEditButtonOfCourseTranslation(LearningPage, 'ja', 2);
    cy.enterCourseName(LearningPage, courseName);
    cy.clickSaveButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.sucessMessageForNewCourseTranslation);
  });

  it('Should Delete added translation in course of \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.wait(5000);
    cy.clickEditButtonOfCourseTranslation(LearningPage, 'ja', 2);
    cy.clickButtonOnKnowledgeAssessment(AssessmentPage.deleteButtonOnAssessmentId, 0);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForDeleteCourseTranslation);
  });

  it('Should delete a course in \'Acme\' account', () => {
    cy.enterSearchData(AccountPage, AccountData.searchString); //input data in search field
    cy.clickSearchIcon(AccountPage); // click on search searchIcon
    cy.verifySearchResult(AccountPage); // Verify the result for specific account
    cy.openAccountUsingLink(AccountPage,0); // click on account link by index
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickDropdown(UserPage, 3);
    cy.clickDropdownMenuItem(UserPage,'Course Customization');
    cy.verifyUrl('/course_customization');
    cy.verifyPageTitle(AccountPage.accountTitleId,AccountData.accountTitleText+'Acme');
    cy.clickViewButtonOfCourse(LearningPage, updatedCourseName, 4);
    cy.clickOnDeleteButton(AccountPage);
    cy.verifySuccessAlertMessage(AccountPage, LearningData.successMessageForDeleteCourse);
  });
});
