// cypress/e2e/constructorPage/add-ingredients.cy.ts
describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    // Перехватываем запрос к API и возвращаем фикстуру
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('добавление булки в конструктор', () => {
    // Получаем первый ингредиент из списка
    cy.get('[data-cy="burger-ingredient"]').first().as('bun');

    // Получаем кнопку "Добавить" для первого ингредиента
    cy.get('@bun').find('.addButton').as('addButton');

    // Кликаем на кнопку "Добавить"
    cy.get('@addButton').click();

    // Проверяем, что ингредиент добавлен в конструктор
    cy.get('[data-cy="burger-constructor-top"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="burger-constructor-bottom"]').should('contain', 'Краторная булка N-200i');
  });

  it('добавление котлеты в конструктор', () => {
    // Получаем второй ингредиент из списка
    cy.get('[data-cy="burger-ingredient"]').eq(1).as('main');

    // Получаем кнопку "Добавить" для второго ингредиента
    cy.get('@main').find('.addButton').as('addButton');

    // Кликаем на кнопку "Добавить"
    cy.get('@addButton').click();

    // Проверяем, что ингредиент добавлен в конструктор
    cy.get('[data-cy="burger-constructor-middle"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });
});