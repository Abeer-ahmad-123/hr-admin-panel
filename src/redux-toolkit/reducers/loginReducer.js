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
  reducers: {
    clearAuth: (state) => {
      state.admindata = {};
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginFn.pending, (state) => {
        console.log('object');

        state.loading = true;
      })
      .addCase(loginFn.fulfilled, (state, action) => {
        console.log('object123');

        state.loading = false;
        state.admindata = action.payload;
      })
      .addCase(loginFn.rejected, (state, action) => {
        console.log('object1213123');
        console.log(action);
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { clearAuth } = userSlice.actions;
export default userSlice.reducer;
