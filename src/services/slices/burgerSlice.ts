import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TUser } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  async () => getIngredientsApi()
);

interface TrackListState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null | undefined;
}

const initialState: TrackListState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
        console.log(action.payload);
      });
  }
});

export const { getIngredientsSelector, getIsIngredientsLoading } =
  burgerSlice.selectors;
