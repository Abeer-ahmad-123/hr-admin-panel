import { createSlice } from '@reduxjs/toolkit';
import { UpdatePassword } from '../actions/UpdatePassword';

const initialState = {
  loading: false,
  updatePassword: {},
  error: null,
};

const loginSlice = createSlice({
  name: ' updatePassword',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(UpdatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.updatePassword = action.payload;
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default loginSlice.reducer;
