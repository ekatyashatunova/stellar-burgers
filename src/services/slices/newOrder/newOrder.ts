import { TOrder } from '../../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';

export interface TNewOrder {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TNewOrder = {
  order: null,
  loading: false,
  error: null
};

export const newOrder = createAsyncThunk(
  'order/newOrder',
  async (data: string[]) => {
    const order = await orderBurgerApi(data);
    return order;
  }
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      });
  },
  selectors: {
    selectNewOrder: (state) => state.order,
    selectLoading: (state) => state.loading
  }
});

export const { selectNewOrder, selectLoading } = newOrderSlice.selectors;
export const newOrderReducer = newOrderSlice.reducer;
export const { clearOrder } = newOrderSlice.actions;
