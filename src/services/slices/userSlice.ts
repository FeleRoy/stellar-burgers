import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);
export const forgotPassword = createAsyncThunk(
  'user/forgotpassword',
  forgotPasswordApi
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

interface userState {
  user: TUser;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | undefined;
  loginError: string | undefined;
  registerError: string | undefined;
  orders: TOrder[];
}

const initialState: userState = {
  user: { name: '', email: '' },
  isAuthChecked: false,
  loading: false,
  error: undefined,
  orders: [],
  loginError: undefined,
  registerError: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = '';
    }
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getIsAuthCheckedSelector: (state) => state.isAuthChecked,
    getErrorSelector: (state) => state.error,
    getLoadingSelector: (state) => state.loading,
    getLoginErrorSelector: (state) => state.loginError,
    getRegisterErrorSelector: (state) => state.registerError,
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      //=========register=============
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.isAuthChecked = true;
      })
      //=========login===============
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.isAuthChecked = true;
      })
      //=========logout===============
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
      })
      //=========getUser===============
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      //=========updateUser===============
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //=========getOrders===============
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const {
  getUserSelector,
  getIsAuthCheckedSelector,
  getErrorSelector,
  getLoadingSelector,
  getLoginErrorSelector,
  getRegisterErrorSelector,
  getOrdersSelector
} = userSlice.selectors;

export const { clearErrors } = userSlice.actions;
