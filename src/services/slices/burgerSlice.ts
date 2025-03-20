import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TUser,
  TOrder
} from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  async () => getIngredientsApi()
);

interface TrackListState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null | undefined;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: TrackListState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    moveСonstructorIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'UP' | 'DOWN' }>
    ) => {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.constructorItems.ingredients.length
      ) {
        return;
      }
      if (action.payload.direction === 'UP') {
        if (action.payload.index === 0) {
          return;
        }
        [
          state.constructorItems.ingredients[action.payload.index - 1],
          state.constructorItems.ingredients[action.payload.index]
        ] = [
          state.constructorItems.ingredients[action.payload.index],
          state.constructorItems.ingredients[action.payload.index - 1]
        ];
      } else if (action.payload.direction === 'DOWN') {
        if (
          action.payload.index ===
          state.constructorItems.ingredients.length - 1
        ) {
          return;
        }
        [
          state.constructorItems.ingredients[action.payload.index],
          state.constructorItems.ingredients[action.payload.index + 1]
        ] = [
          state.constructorItems.ingredients[action.payload.index + 1],
          state.constructorItems.ingredients[action.payload.index]
        ];
      }
    },
    deleteСonstructorIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientsLoading: (state) => state.isIngredientsLoading,
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
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
      });
  }
});

export const {
  getIngredientsSelector,
  getIsIngredientsLoading,
  getConstructorItems,
  getOrderRequest,
  getOrderModalData
} = burgerSlice.selectors;

export const {
  addIngredient,
  moveСonstructorIngredient,
  deleteСonstructorIngredient
} = burgerSlice.actions;
