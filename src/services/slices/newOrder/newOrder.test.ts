import { initialState, newOrder, newOrderReducer } from './newOrder';
import { expect, describe, test } from '@jest/globals';

describe('проверка редьюсера слайса newOrder', () => {
  test('pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = newOrderReducer(initialState, {
      type: newOrder.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('rejected', () => {
    const errorMessage = 'Ошибка при создании заказа';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = newOrderReducer(initialState, {
      type: newOrder.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('fulfilled', () => {
    const mockNewOrder = {
      createdAt: '2024-12-01T09:56:35.804Z',
      ingredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c'
        },
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c'
        },
        {
          calories: 4242,
          carbohydrates: 242,
          fat: 142,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          name: 'Биокотлета из марсианской Магнолии',
          price: 424,
          proteins: 420,
          type: 'main',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa0941'
        }
      ],
      name: 'Краторный био-марсианский бургер',
      number: 61077,
      status: 'done',
      updatedAt: '2024-12-01T09:56:36.830Z',
      _id: '674c32d3e367de001daf5e56'
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      order: mockNewOrder
    };

    const newState = newOrderReducer(initialState, {
      type: newOrder.fulfilled.type,
      payload: {order: mockNewOrder}
    });

    expect(newState).toEqual(expectedState);
  });
});
