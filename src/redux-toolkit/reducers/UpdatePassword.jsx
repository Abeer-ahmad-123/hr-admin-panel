import { createSlice } from '@reduxjs/toolkit';
import { UpdatePassword } from '../actions/UpdatePassword';

const initialState = {
  loading: false,
  admindata: {},
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(UpdatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.admindata = action.payload?.userData;

        state.accessToken = action.payload?.token;
        state.refreshToken = action.payload;
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default loginSlice.reducer;
