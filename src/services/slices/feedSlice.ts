import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

interface FeedState {
  isLoading: boolean;
  error: string | null | undefined;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: FeedState = {
  isLoading: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.total = action.payload.totalToday;
      });
  }
});

export const { getTotalSelector, getTotalTodaySelector, getOrdersSelector } =
  feedSlice.selectors;
