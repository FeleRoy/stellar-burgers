import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);
export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);
export const forgotPassword = createAsyncThunk(
  'user/forgotpassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);
export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);
export const getOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

interface userState {
  user: TUser;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null | undefined;
  orders: TOrder[];
}

const initialState: userState = {
  user: { name: '', email: '' },
  isAuthenticated: false,
  loading: false,
  error: null,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthenticated = true;
    }
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getIsAuthenticatedSelector: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      //=========register=============
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      //=========login===============
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      //=========logout===============
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      //=========getUser===============
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //=========updateUser===============
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //=========getOrders===============
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const { getUserSelector, getIsAuthenticatedSelector } =
  userSlice.selectors;

export const { authChecked } = userSlice.actions;
