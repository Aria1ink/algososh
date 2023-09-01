import { blueCircle, greenCircle, purpleCircle } from "../../../src/constants/cypress";

describe('Проверка работы страницы "Связный список"', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="listLink"]').click();
    cy.contains("Связный список");
    cy.get('[class^=input_input__]').first().as('value');
    cy.get('[class^=input_input__]').last().as('index');
    cy.contains('Добавить в head').first().as('addHead');
    cy.contains('Добавить в tail').first().as('addTail');
    cy.contains('Добавить по индексу').first().as('addByIndex');
    cy.contains('Удалить по индексу').first().as('delByIndex');
  });
  /*
  it('кнопки отключены при пустых инпутах', function () {
    cy.get('@value')
      .should('be.empty')
      .get('@addHead')
      .should('be.disabled')
      .get('@addTail')
      .should('be.disabled')
      .get('@addByIndex')
      .should('be.disabled')
    cy.get('@index')
      .should('be.empty')
      .get('@addByIndex')
      .should('be.disabled')
      .get('@delByIndex')
      .should('be.disabled');
  });
  it('отрисовка дефолтного списка', function () {
    cy.get('[class*=circle_circle__]').each( ($el) => {
      cy.get($el).should("have.css", "border-color", blueCircle).contains(/\S{1,4}/);
    });
  });
  it('добавление элемента в head', function () {
    const inputValue = 10;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@addHead').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .first()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .first()
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('head')
  });
  it('добавление элемента в tail', function () {
    const inputValue = 10;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@addTail').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", purpleCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .last()
      .should("have.css", "border-color", greenCircle)
      .contains(inputValue)
    cy.get('[class*=circle_circle__]')
      .last()
      .should("have.css", "border-color", blueCircle)
      .contains(inputValue)
      .parent()
      .parent()
      .contains('tail')
  });
  */
  it('добавление элемента по индексу', function () {
    const inputValue = 10;
    const inputIndex = 1;
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.get('@addByIndex').click();
    const circles = cy.get('[class^=circle_circle__]');
    cy.get(circles[inputIndex])
      .contains(inputValue);
  });
  /*
  it('удаление элемента из head', function () {

  });
  it('удаление элемента из tail', function () {

  });
  it('удаление элемента по индексу', function () {

  });
  */
});