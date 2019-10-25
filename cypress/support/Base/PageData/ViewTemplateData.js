// setup user data that will be used in the tests

const ViewTemplateData = {
  viewTemplateTitleText: 'View Templates',
  viewTemplatePreviewText: 'Template Preview',
  validationMessageForTemplateBlankField: 'Error saving in view_template: ["Name can\'t be blank", "Subject can\'t be blank", "Body can\'t be blank", "Code is not included in the list"]',
  invalidFeedbackMessageForCodeId: 'is not included in the list',
  validationMessageForTemplateCodeIdAndSubject: 'Error saving in view_template: ["Subject can\'t be blank", "Body can\'t be blank", "Code is not included in the list"]',
  templateQuestionText: 'Account Specific Customizations:',
  viewTemplateItemSucessMessage: 'View Template was successfully updated.',
  deleteViewTemplateItemSucessMessage: 'View Template translation was successfully deleted.',
};

// export the users you created so you can import them in your tests
export { ViewTemplateData};
