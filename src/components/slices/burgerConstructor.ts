import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TConstructorBurgerData {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: TConstructorBurgerData = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients.push(action.payload);
    },
    deleteFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (data) => data.id !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructor: (state) => state.ingredients
  }
});

export const { selectConstructor } = burgerConstructorSlice.selectors;
export const ConstructorReducer = burgerConstructorSlice.reducer;
