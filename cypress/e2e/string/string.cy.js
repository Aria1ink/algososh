describe('Проверка работы страницы "строка"', function () {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="recursionLink"]').click();
    cy.contains("Строка");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Развернуть').first().as('button');
  });
  it('кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('анимация разворота строки', function () {
    const step1 = '1234';
    const step2 = '4231';
    const step3 = '4321';
    const step1color = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];
    const step2color = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];
    const step3color = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];
    cy.get('@input').should('be.empty').type(step1);
    cy.get('@button').click();
    cy.get('[class^=circle_circle__]').each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step1color[index])
        .contains(step1[index])
    });
    cy.get('[class^=circle_circle__]').each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step2color[index])
        .contains(step2[index])
    });
    cy.get('[class^=circle_circle__]').each(($el, index) => {
      cy.get($el)
        .should("have.css", "border-color", step3color[index])
        .contains(step3[index])
    });
  })
});