describe('Проверка работы страницы "Очередь"', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="queueLink"]').click();
    cy.contains("Очередь");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Добавить').first().as('add');
    cy.contains('Удалить').first().as('del');
    cy.contains('Очистить').first().as('clear');
  });
  it('кнопки отключены при пустом инпуте', function () {
    cy.get('@input')
      .should('be.empty')
      .get('@add')
      .should('be.disabled')
      .get('@del')
      .should('be.disabled')
      .get('@clear')
      .should('be.disabled');
  });
  it('добавление работает корректно', function () {
    const inputValue = 2;
    cy.get('@input').should('be.empty').type(inputValue);
    cy.get('@add').click();
    cy.get('[class^=circle_circle__]')
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(inputValue)
      .parent()
      .parent()
      .contains('head')
      .parent()
      .contains('tail')
    cy.get('[class^=circle_circle__]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
  });
  it('удаление работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get('[class^=circle_circle__]').each( ($el) => {
      cy.get($el).contains('tail').should("have.length", 0);
    });
  });
  it('очистка работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get('[class^=circle_circle__]').each( ($el) => {
      cy.get($el).contains('head').should("have.length", 0);
    });
  });
});