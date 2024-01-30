import { createSlice } from '@reduxjs/toolkit';
import { loginFn, refreshToken } from '../actions/loginActions';

const initialState = {
  loading: false,
  admindata: {},
  token: null,
  refreshToken: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.admindata = null;
      state.error = null;
      state.token = null;
      state.refreshToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginFn.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginFn.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.admindata = action.payload.userData;
        state.token = action.payload.token;
        state.refreshToken = action.payload['refresh-token'];
      })
      .addCase(loginFn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload?.token) {
          console.log('token is not expired');
        } else {
          state.token = action.payload.token;
          state.refreshToken = action.payload['refresh-token'];
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
