import { TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

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
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (data) => data.id !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    selectIngredient: (state) => state.ingredients,
    selectBun: (state) => state.bun
  }
});

export const { selectIngredient, selectBun } = burgerConstructorSlice.selectors;
export const ConstructorReducer = burgerConstructorSlice.reducer;
export const {addToConstructor,deleteFromConstructor, resetConstructor } = burgerConstructorSlice.actions
