import { initialState } from './feed';
import { feedReducer, fetchGetFeedsApi } from './feed';

describe('проверка редьюсера слайса feed', () => {
  test('pending', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };

    const newState = feedReducer(initialState, {
      type: fetchGetFeedsApi.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('rejected', () => {
    const errorMessage = 'Ошибка загрузки ленты заказов';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = feedReducer(initialState, {
      type: fetchGetFeedsApi.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);

  });

  test('fulfilled', () => {
    const mockFeed = {
      orders: [
        {
            "_id": "674c2c3ae367de001daf5e1d",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2024-12-01T09:28:26.178Z",
            "updatedAt": "2024-12-01T09:28:27.211Z",
            "number": 61074
        },
        {
            "_id": "674c27c7e367de001daf5dfd",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0940",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0940",
                "643d69a5c3f7b9001cfa0940"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный метеоритный бургер",
            "createdAt": "2024-12-01T09:09:27.961Z",
            "updatedAt": "2024-12-01T09:09:28.812Z",
            "number": 61073
        }, 
        {
          "_id": "674c2687e367de001daf5df7",
          "ingredients": [
              "643d69a5c3f7b9001cfa0946",
              "643d69a5c3f7b9001cfa093c",
              "643d69a5c3f7b9001cfa093c"
          ],
          "status": "done",
          "name": "Краторный минеральный бургер",
          "createdAt": "2024-12-01T09:04:07.345Z",
          "updatedAt": "2024-12-01T09:04:08.226Z",
          "number": 61072
      },
      ],

      /*total: 60700,
      totalToday: 3*/
    }
     
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      orders: mockFeed
    };

    const newState = feedReducer(initialState, {
      type: fetchGetFeedsApi.fulfilled.type,
      payload: mockFeed
    });
  
    expect(newState).toEqual(expectedState);
  });
});
