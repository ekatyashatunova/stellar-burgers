import { initialState, getOrders, orderReducer, getOrderByNumber } from './orders';

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
    })

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

    })

    test('getOrders fulfilled', () => {
      const mockOrders = {
      }

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
  })

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

  })

  test('getOrderByNumber fulfilled', () => {
    const mockOrder = {

    }

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

  })
})
