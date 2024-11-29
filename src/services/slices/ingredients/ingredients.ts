import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface TIngredientsData {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}
const initialState: TIngredientsData = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchGetIngredients = createAsyncThunk(
  'ingredients/fetchGetIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ППЦ ОШИБКА';
      })
      .addCase(fetchGetIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectLoading } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
