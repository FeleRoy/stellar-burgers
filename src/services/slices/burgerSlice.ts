import { getIngredientsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  getIngredientsApi
);
export const orderBurger = createAsyncThunk(
  'burger/orderBurger',
  orderBurgerApi
);
export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  getOrderByNumberApi
);

interface burgerState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null | undefined;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  selectedOrder: TOrder | null;
}

const initialState: burgerState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  selectedOrder: null
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
    },
    closeOrderModalAction: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.orderRequest = false;
      state.orderModalData = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIsIngredientsLoadingSelector: (state) => state.isIngredientsLoading,
    getConstructorItemsSelector: (state) => state.constructorItems,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData,
    getSelectedOrderSelector: (state) => state.selectedOrder
  },
  extraReducers: (builder) => {
    builder
      //==========getIngredients===============
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
      })
      //=========orderBurger===================
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      //========OrderByNumber====================
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message;
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.selectedOrder = action.payload.orders[0];
      });
  }
});

export const {
  getIngredientsSelector,
  getIsIngredientsLoadingSelector,
  getConstructorItemsSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector,
  getSelectedOrderSelector
} = burgerSlice.selectors;

export const {
  addIngredient,
  moveСonstructorIngredient,
  deleteСonstructorIngredient,
  closeOrderModalAction,
  clearSelectedOrder
} = burgerSlice.actions;
