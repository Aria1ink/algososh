describe('Проверка работы роутинга', function() {
  it('главная страница', function() {
    cy.visit('/');
  });
  it('строка', function() {
    cy.visit('/recursion');
  });
  it('последовательность Фибоначчи', function() {
    cy.visit('/fibonacci');
  });
  it('сортировка массива', function() {
    cy.visit('/sorting');
  });
  it('стек', function() {
    cy.visit('/stack');
  });
  it('очередь', function() {
    cy.visit('/queue');
  });
  it('связный список', function() {
    cy.visit('/list');
  });
}); 