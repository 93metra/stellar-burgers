// cypress/e2e/constructorPage/order-submit.cy.ts
describe('Оформление заказа', () => {
  beforeEach(() => {
    // Setup initial tokens in local storage and cookies
    localStorage.setItem('refreshToken', 'initialMockRefreshToken');
    cy.setCookie('accessToken', 'initialMockAccessToken');

    // Intercept the token refresh request and provide mock response
    cy.intercept('POST', '**/auth/token', { fixture: 'refresh-token.json' });

    // Intercept other necessary requests and provide mock responses
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    // Visit the main page
    cy.visit('/');
  });

  afterEach(() => {
    // Clear local storage and cookies
    localStorage.clear();
    cy.clearCookies();
  });

  it('Полный цикл оформления заказа', () => {
    // Добавляем первый ингредиент из списка (булка)
    cy.get('[data-cy="burger-ingredient"]').first().find('.addButton').click();
    // Добавляем второй ингредиент из списка (котлета)
    cy.get('[data-cy="burger-ingredient"]').eq(1).find('.addButton').click();

    // Кликаем на кнопку "Оформить заказ"
    cy.get('.submit-order-button').click();
    // Проверяем, что модальное окно с успешным заказом открыто
    cy.get('[data-cy="modal"]').should('be.visible');
    // Проверяем, что в модальном окне содержится номер заказа
    cy.get('[data-cy="modal"]').should('contain', '57661');

    // Закрываем модальное окно
    cy.get('[data-cy="close-button"]').click();
    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пустой
    cy.get('[data-cy="burger-constructor-top"]').should('not.exist');
    cy.get('[data-cy="burger-constructor-bottom"]').should('not.exist');
    cy.get('[data-cy="burger-constructor-middle"]').should('not.exist');
    cy.get('[data-cy="constructor-price"]').should('contain', '0');
  });
});