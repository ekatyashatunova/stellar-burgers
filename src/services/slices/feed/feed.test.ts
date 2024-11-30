import { initialState } from './feed';
import { feedReducer, fetchGetFeedsApi } from './feed';

describe('проверка редьюсера слайса feed', () => {
    test('pending', () => {
        const expectedState = {
            ...initialState,
            loading: true
        }

        const newState = feedReducer(initialState, {
            type: fetchGetFeedsApi.pending.type
          });
          expect(newState).toEqual(expectedState);
    })

    test('rejected', () => {

    })

    test('fulfilled', () => {

    })
})
