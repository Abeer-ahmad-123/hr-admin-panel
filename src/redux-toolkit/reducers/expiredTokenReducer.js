import { createSlice } from '@reduxjs/toolkit';
import refreshTokenFun from '../actions/refreshTokenFn';

const initialState = {
  loading: false,
  isExpired: false,
  success: true,
  error: null,
};

const expiredTokenSlice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(refreshTokenFun.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokenFun.fulfilled, (state, action) => {
        state.loading = false;
        state.isExpired = action.payload;
      })
      .addCase(refreshTokenFun.rejected, (state, action) => {
        state.loading = false;
        state.isExpired = true;
        state.error = action.error;
      });
  },
});

export default expiredTokenSlice.reducer;
