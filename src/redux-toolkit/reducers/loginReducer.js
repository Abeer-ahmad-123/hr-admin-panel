import { createSlice } from '@reduxjs/toolkit';
import { loginFn } from '../actions/loginActions';

const initialState = {
  loading: false,
  admindata: [],

  error: null,
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},

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
        state.error = action.payload;
      });
  },
});

// export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
