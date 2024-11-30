import { TOrder } from '../../../utils/types';
import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TFeedData {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
}

export const initialState: TFeedData = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
};

export const fetchGetFeedsApi = createAsyncThunk(
  'orders/fetchGetFeedsApi',
  getFeedsApi
);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeedsApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetFeedsApi.fulfilled, (state, action) => {
        (state.orders = action.payload.orders),
          (state.loading = false),
          (state.total = action.payload.total),
          (state.totalToday = action.payload.totalToday);
      })
      .addCase(fetchGetFeedsApi.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { selectFeed, selectTotal, selectTotalToday, selectLoading } =
  feedSlice.selectors;
export const feedReducer = feedSlice.reducer;
