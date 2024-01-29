import { createSlice } from '@reduxjs/toolkit';
import { loginFn } from '../actions/loginActions';

const initialState = {
  loading: false,
  admindata: {},
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.admindata = null;
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
        state.admindata = action.payload;
      })
      .addCase(loginFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
