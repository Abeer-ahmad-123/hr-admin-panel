import { createSlice } from '@reduxjs/toolkit';
import { loginFn, refreshTokenFn } from '../actions/loginActions';

const initialState = {
  loading: false,
  admindata: {},

  accessToken: '',
  refreshToken: '',
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.admindata = null;
      state.userData = {};
      state.accessToken = '';
      state.refreshToken = '';
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginFn.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginFn.fulfilled, (state, action) => {
        state.loading = false;
        state.admindata = action.payload?.userData;

        state.accessToken = action.payload?.token;
        state.refreshToken = action.payload?.['refresh-token'];
      })
      .addCase(loginFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(refreshTokenFn.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokenFn.fulfilled, (state, action) => {
        state.accessToken = action.payload?.token;
        state.refreshToken = action.payload?.['refresh-token'];
      })
      .addCase(refreshTokenFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
