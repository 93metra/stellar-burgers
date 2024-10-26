// cypress/e2e/constructorPage/modal-open-close.cy.ts
describe('открытие/закрытие модального окна ингредиента', () => {
  beforeEach(() => {
    // Перехватываем запрос к API и возвращаем фикстуру
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('открытие модального окна', () => {
    cy.get('[data-cy="burger-ingredient"]').first().click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('закрытие модального окна на кнопку', () => {
    cy.get('[data-cy="burger-ingredient"]').eq(1).click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[data-cy="close-button"]').click();

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрытие модального окна на overlay', () => {
    cy.get('[data-cy="burger-ingredient"]').eq(2).click();

    // Проверяем, что модальное окно открыто
    cy.get('[data-cy="modal"]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-overlay"]').click({force: true});

    // Проверяем, что модальное окно закрыто
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('проверка правильности данных в модальном окне', () => {
    // Кликаем на первый ингредиент
    cy.get('[data-cy="burger-ingredient"]').first().click();

    // Проверяем, что в модальном окне содержатся данные первого ингредиента
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="modal"]').should('contain', '420');
    cy.get('[data-cy="modal"]').should('contain', '80');
    cy.get('[data-cy="modal"]').should('contain', '24');
    cy.get('[data-cy="modal"]').should('contain', '53');

    // Проверяем, что в модальном окне содержится нужная картинка
    cy.get('[data-cy="modal"] img').should($img => {
      const src = $img.attr('src');
      const link1 = 'https://code.s3.yandex.net/react/code/bun-02.png';
      const link2 = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png';
      const link3 = 'https://code.s3.yandex.net/react/code/bun-02-large.png';
      expect(src === link1 || src === link2 || src === link3).to.be.true;
    });

    // Закрываем модальное окно
    cy.get('[data-cy="close-button"]').click();

    // Кликаем на второй ингредиент
    cy.get('[data-cy="burger-ingredient"]').eq(1).click();

    // Проверяем, что в модальном окне содержатся данные второго ингредиента
    cy.get('[data-cy="modal"]').should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="modal"]').should('contain', '4242');
    cy.get('[data-cy="modal"]').should('contain', '420');
    cy.get('[data-cy="modal"]').should('contain', '142');
    cy.get('[data-cy="modal"]').should('contain', '242');

    // Проверяем, что в модальном окне содержится нужная картинка
    cy.get('[data-cy="modal"] img').should($img => {
      const src = $img.attr('src');
      const link1 = 'https://code.s3.yandex.net/react/code/meat-01.png';
      const link2 = 'https://code.s3.yandex.net/react/code/meat-01-mobile.png';
      const link3 = 'https://code.s3.yandex.net/react/code/meat-01-large.png';
      expect(src === link1 || src === link2 || src === link3).to.be.true;
    });
  });
});