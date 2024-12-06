let bun = 'Краторная булка N-200i';
let main = 'Биокотлета из марсианской Магнолии';
let sauce = 'Соус Spicy-X';
let numberOrder = '61762';
let selectBun = 'Выберите булки';
let selectFillings = 'Выберите начинку';

describe('тестирование страницы', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');

    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).as('bun');
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0941']`).as('main');
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0942']`).as('sauce');
  });

  describe('добавление ингредиентов в конструктор', () => {
    it('addToConstructor', () => {
      cy.get(`[data-cy='noTopBun']`).contains(selectBun);
      cy.get(`[data-cy='noFillings']`).contains(selectFillings);
      cy.get(`[data-cy='noDownBun']`).contains(selectBun);

      cy.get('@bun').contains('Добавить').click();
      cy.get('@main').contains('Добавить').click();
      cy.get('@sauce').contains('Добавить').click();

      cy.get(`[data-cy='bunTop']`).contains(bun);
      cy.get(`[data-cy='Fillings']`).contains(main);
      cy.get(`[data-cy='Fillings']`).contains(sauce);
      cy.get(`[data-cy='bunDown']`).contains(bun);
    });
  });

  describe('тестирование модального окна для ингредиента', () => {
    it('открытие модального окна', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get('@bun').click();
      cy.get(`[data-cy=openModal]`).contains(bun).should('be.visible');
    });

    it('закрытие модалки на крестик', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get('@bun').click();
      cy.get(`[data-cy=openModal]`).contains(bun).should('be.visible');
      cy.get(`[data-cy=closeModalButton]`).click();
      cy.get(`[data-cy=openModal]`).should('not.exist');
    });

    it('закрытие модалки по оверлею', () => {
      cy.get(`[data-cy=openModal]`).should('not.exist');
      cy.get('@bun').click();
      cy.get(`[data-cy=openModal]`).contains(bun).should('be.visible');
      cy.get(`[data-cy=closeModalOverley]`).click({ force: true });
      cy.get(`[data-cy=openModal]`).should('not.exist');
    });
  });

  describe('тестирование оформления заказа', () => {
    it('клик по кнопке оформить', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'newOrder' });
      cy.setCookie('accessToken', 'test');
      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'test');
      });

      cy.visit('/');

      cy.get('@bun').contains('Добавить').click();
      cy.get('@main').contains('Добавить').click();
      cy.get('@sauce').contains('Добавить').click();

      cy.get(`[data-cy='bunTop']`).contains(bun);
      cy.get(`[data-cy='Fillings']`).contains(main);
      cy.get(`[data-cy='Fillings']`).contains(sauce);
      cy.get(`[data-cy='bunDown']`).contains(bun);

      cy.get(`[data-cy=orderClick]`).click();

      cy.get(`[data-cy=openModal]`).contains(numberOrder).should('be.visible');
      cy.get(`[data-cy=closeModalButton]`).click();
      cy.get(`[data-cy=openModal]`).should('not.exist');

      cy.get(`[data-cy='noTopBun']`).contains(selectBun);
      cy.get(`[data-cy='noFillings']`).contains(selectFillings);
      cy.get(`[data-cy='noDownBun']`).contains(selectBun);

      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });
});
