import {
  ingredientsReducer,
  initialState,
  fetchGetIngredients
} from './ingredients';
import { ingredientsAdd } from '../burgerConstructor/burgerMoks';
import { expect, describe, test } from '@jest/globals';

describe('проверка редьюсера слайса ingredients', () => {
  test('pending', () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };

    const newState = ingredientsReducer(initialState, {
      type: fetchGetIngredients.pending.type
    });
    expect(newState).toEqual(expectedState);
  });

  test('rejected', () => {
    const errorMessage = 'ППЦ ОШИБКА';
    const expectedState = {
      ...initialState,
      loading: false,
      error: errorMessage
    };

    const newState = ingredientsReducer(initialState, {
      type: fetchGetIngredients.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });
});

test('fulfilled', () => {
  const expectedState = {
    ...initialState,
    loading: false,
    error: null,
    ingredients: ingredientsAdd
  };

  const newState = ingredientsReducer(initialState, {
    type: fetchGetIngredients.fulfilled.type,
    payload: ingredientsAdd
  });

  expect(newState).toEqual(expectedState);
});
