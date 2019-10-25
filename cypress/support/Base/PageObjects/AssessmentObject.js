const AssessmentPage = {
  assessmentNameField: '#knowledge_assessment_name',
  behaviorAssessmentNameFieldId: '#behavior_assessment_name',
  assessmentDropdownId: '.form-group select',
  assessmentKnowledgeQuestionCheckboxId: 'form .knowledge_assessment_items label input[type="checkbox"]',
  assessmentBehaviorQuestionCheckboxId: 'form .behavior_assessment_items label input[type="checkbox"]',
  cancelButtonOnAssessmentId: '#body-container a.btn.border i',
  deleteButtonOnAssessmentId: '#body-container a.btn-danger i',
  assessmentUserCollectionAddButtonId: '#assessment_user_collection a',
  assessmentUserCollectionCheckboxesId: '.form-check-input',
  assessmentUserCollectionDueDateId: '#assessment_user_collection_due_date',
  assessmentUserCollectionNameLinkId: '#assessment_user_collection .table tbody tr td a',
  knowledgeAssessmentCollapseArrowId: 'i.fa.fa-chevron-down.pull-right.collapse-arrow',
  knowledgeAssessmentQuestionViewId: '#questions table tr:nth-child(1) td:nth-child(5)',
  behaviorAssessmentQuestionViewId: '#behavior-assessment-items table tr:nth-child(1) td:nth-child(7) a',
  translationTextId: 'h4.card-title',
  questionLanguageId: '#questions table tr:nth-child(1) td:nth-child(3)',
  behaviorLanguageId: '#behavior-assessment-items table tr:nth-child(1) td:nth-child(5)',
  editLanguageButtonId: 'div#bai-translation tr:nth-child(5) a',
  exportKnowledgeButton: '.container-fluid a',
  activeDateUserCollectionId: '#assessment_user_collection_active_date',
};

// export the users you created so you can import them in your tests
export { AssessmentPage};