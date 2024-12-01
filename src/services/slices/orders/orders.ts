import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '../../../utils/burger-api';

export interface TOrderData {
  orders: TOrder[];
  orderByNumber: TOrder | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TOrderData = {
  orders: [],
  orderByNumber: null,
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения заказов';
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка получения заказа по номеру';
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderByNumber: (state) => state.orderByNumber
  }
});

export const orderReducer = orderSlice.reducer;
export const { selectOrders, selectOrderByNumber } = orderSlice.selectors;
