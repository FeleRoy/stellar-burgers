import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface TrackListState {
  user: TUser;
}

const initialState: TrackListState = {
  user: { name: '', email: '' }
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {}
});
