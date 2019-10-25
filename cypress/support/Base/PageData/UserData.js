const UserData = {
  userTitleText: 'Users',
  importButtonText: 'Import Users',
  warningModelTitleText: 'Warning',
  searchString: 'Bruce Wayne',
  searchCreteriaText: '1 users met the search criteria',
  userSuccessMessage: 'User was successfully created.',
  userUpdateSuccessMessage: 'User was successfully updated.',
  userDeleteSuccessMessage: 'User was successfully deleted.',
  warningMessageInBulkEditForm: 'Warning: You are editing all users. This acton cannot be undone!',
  completeAssessmentSuccessMessage: 'Thank you for completing this assessment.',
  validationMessageForNewUserBlankField: 'Error saving user: ["Email can\'t be blank", "First name can\'t be blank", "Last name can\'t be blank"]',
  validationMessageForEmailAndLastBlankField: 'Error saving user: ["Email can\'t be blank", "Last name can\'t be blank"]',
  validationMessageForEmailBlankField: 'Error saving user: ["Email can\'t be blank"]',
  assessmentTextOnStrategicPage: 'Q1 Assessment Period',
  passwordNote: 'Note: Passwords must be a minimum of eight characters, and contain one uppercase letter, and one number or special character.',
  shortPasswordInvalidFeedback: 'is too short (minimum is 8 characters), must be a minimum of eight characters, and contain one uppercase letter, and one number or special character.',
  passwordCofirmationInvalidFeedback: 'doesn\'t match Password',
  existingEmailAddressValidation: 'Error saving user: ["Email has already been taken"]',
  passwordInvalidFeedback:'must be a minimum of eight characters, and contain one uppercase letter, and one number or special character.',
  validationMessageForPreviousPassword: 'Unable to update user: ["Password You cannot reuse a previously used password. Please enter a new password."]',
};

// export the users you created so you can import them in your tests
export { UserData};
