import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails, loginFn } from '../actions/loginActions';

const initialState = {
  loading: false,
  admindata: {},
  userData: {},
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.admindata = {};
      state.userData = {};
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
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
