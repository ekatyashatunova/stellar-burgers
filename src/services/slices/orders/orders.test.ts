import {
  initialState,
  getOrders,
  orderReducer,
  getOrderByNumber
} from './orders';

describe('проверка редьюсера слайса orders', () => {
  test('getOrders pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = orderReducer(initialState, {
      type: getOrders.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('getOrders rejected', () => {
    const errorMessage = 'Ошибка получения заказов';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = orderReducer(initialState, {
      type: getOrders.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('getOrders fulfilled', () => {
    const mockOrders = {
      orders: [
        {
          _id: '673ceda6b27b06001c3e9368',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941'
          ],
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2024-11-19T19:57:26.455Z',
          updatedAt: '2024-11-19T19:57:27.356Z',
          number: 59803
        },
        {
          _id: '673cedbdb27b06001c3e936b',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941'
          ],
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2024-11-19T19:57:49.453Z',
          updatedAt: '2024-11-19T19:57:50.355Z',
          number: 59804
        },
        {
          _id: '673cede9b27b06001c3e936c',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2024-11-19T19:58:33.960Z',
          updatedAt: '2024-11-19T19:58:34.841Z',
          number: 59805
        }
      ]
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      orders: mockOrders
    };

    const newState = orderReducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    });

    expect(newState).toEqual(expectedState);
  });

  test('getOrderByNumber pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('getOrderByNumber rejected', () => {
    const errorMessage = 'Ошибка получения заказа по номеру';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('getOrderByNumber fulfilled', () => {
    const mockOrder = {
      orders: [
        {
          _id: '674c8bdae367de001daf60e7',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2024-12-01T16:16:26.716Z',
          updatedAt: '2024-12-01T16:16:27.957Z',
          number: 61167,
        }
      ]
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      orderByNumber: mockOrder
    };

    const newState = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder
    });

    expect(newState).toEqual(expectedState);
  });
});
