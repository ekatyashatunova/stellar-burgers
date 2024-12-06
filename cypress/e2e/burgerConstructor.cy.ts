describe('тестирование страницы', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  describe('добавление ингредиентов в конструктор', () => {
    it('addToConstructor', () => {
      cy.get(`[data-cy='noTopBun']`).contains('Выберите булки');
      cy.get(`[data-cy='noFillings']`).contains('Выберите начинку');
      cy.get(`[data-cy='noDownBun']`).contains('Выберите булки');

      cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy='643d69a5c3f7b9001cfa0941']`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy='643d69a5c3f7b9001cfa0942']`)
        .contains('Добавить')
        .click();

      cy.get(`[data-cy='bunTop']`).contains('Краторная булка N-200i');
      cy.get(`[data-cy='Fillings']`).contains(
        'Биокотлета из марсианской Магнолии'
      );
      cy.get(`[data-cy='Fillings']`).contains('Соус Spicy-X');
      cy.get(`[data-cy='bunDown']`).contains('Краторная булка N-200i');
    });
  });

  describe('тестирование модального окна для ингредиента', () => {
    it('открытие модального окна', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy=openModal]`)
        .contains('Краторная булка N-200i')
        .should('be.visible');
    });

    it('закрытие модалки на крестик', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy=openModal]`)
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get(`[data-cy=closeModalButton]`).click();
      cy.get(`[data-cy=openModal]`).should('not.exist');
    });

    it('закрытие модалки по оверлею', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy=openModal]`)
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get(`[data-cy=closeModalOverley]`).click({ force: true });
      cy.get(`[data-cy=openModal]`).should('not.exist');
    });
  });

  describe('тестирование оформления заказа', () => {
    it('клик по кнопке оформить', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'newOrder' });
      cy.setCookie('accessToken', 'что-то');
      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'что-то');
      });

      cy.visit('/');

      cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy='643d69a5c3f7b9001cfa0941']`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy='643d69a5c3f7b9001cfa0942']`)
        .contains('Добавить')
        .click();

        cy.get(`[data-cy='bunTop']`).contains('Краторная булка N-200i');
        cy.get(`[data-cy='Fillings']`).contains(
          'Биокотлета из марсианской Магнолии'
        );
        cy.get(`[data-cy='Fillings']`).contains('Соус Spicy-X');
        cy.get(`[data-cy='bunDown']`).contains('Краторная булка N-200i');

      cy.get(`[data-cy=orderClick]`).click();

      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get(`[data-cy='61762']`).click();
      cy.get(`[data-cy=openModal]`)
        .contains('61762')
        .should('be.visible');
      cy.get(`[data-cy=closeModalButton]`).click();
      cy.get(`[data-cy=openModal]`).should('not.exist');

      
    });
  });
});
