Cypress.Commands.add('clickNavIconToggelButton', (loc) => {
	cy.get(loc).click({force: true});
});

Cypress.Commands.add('clickNavMenuLink', (loc, index) => {
	cy.get(loc).eq(index).click({force: true});
});

Cypress.Commands.add('enterViewTemplateName', (loc, data) => {
	cy.get(loc.viewTemplateNameId).clear();
	cy.get(loc.viewTemplateNameId).type(data).should('have.value', data);
});

Cypress.Commands.add('enterViewTemplateSubject', (loc, data) => {
	cy.get(loc.viewTemplateSubjectId).clear();
	cy.get(loc.viewTemplateSubjectId).type(data).should('have.value', data);
});

Cypress.Commands.add('clickViewTemplate', (loc) => {
	cy.get(loc).click();
});

Cypress.Commands.add('clickExistingTemplate', (templateName) => {
	cy.get('.card h4').each(($el,indexValueOfTemplate,$list) => {
		if (($el.text().trim()) === templateName) {
			cy.get(`.card:nth-child(${++indexValueOfTemplate}) #view-template-translation tbody tr:nth-child(1) td:nth-child(1) a`).invoke('text').then((text) => {
				cy.get(`.card:nth-child(${indexValueOfTemplate}) #view-template-translation tbody tr:nth-child(1) td:nth-child(1) a`).click({force:true});
				cy.wait(5000);
				cy.get('h3.data_title').invoke('text').then((text1) => {
			    expect(text1).contain(text);
			  })
			})
		}
	});
	});

Cypress.Commands.add('clickAddNewLanguageButton', (loc) => {
	cy.get(loc).click();
});

Cypress.Commands.add('clickEditButtonOnViewTemplate', (data, locatorIndex) => {
	cy.get('#comptency-translation tbody tr td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
   cy.log($el.text());
   cy.log(index);
   if ($el.text() === data) {
   	cy.log(index);
   	cy.log('we are deleting the module: '+ data);                  //print name of module to be deleted.
   	cy.get(`#comptency-translation tbody tr:nth-child(${++index}) td:nth-child(3) a`).eq(locatorIndex).click();  //click on delete icon for newly created module.
   } else {
     cy.log('no language founded');
   }
 })
});

Cypress.Commands.add('clickEditButtonForRoleSpecificCustomizationOnViewTemplate', (data) => {
	cy.get('#role-translation tbody tr td:nth-child(1)').each(($el, index, $list) => {          //used each for deleting newly created module.
   cy.log($el.text());
   cy.log(index);
   if ($el.text() === data) {
   	cy.log(index);
   	cy.log('we are deleting the module: '+ data);                  //print name of module to be deleted.
   	cy.get(`#role-translation tbody tr:nth-child(${++index}) td:nth-child(3) a`).click();  //click on delete icon for newly created module.
   } else {
     cy.log('no role specific customization found');
   }
 })
});
