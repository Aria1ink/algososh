describe('Проверка работы страницы "Стек"', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="stackLink"]').click();
    cy.contains("Стек");
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
    cy.get('[class^=circle_circle__]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
  });
  it('удаление работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get('[class^=circle_circle__]').should("have.length", 0);
  });
  it('очистка работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type(2);
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get('[class^=circle_circle__]').should("have.length", 0);
  });
});