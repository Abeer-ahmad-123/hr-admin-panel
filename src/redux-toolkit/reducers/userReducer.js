import { createSlice } from '@reduxjs/toolkit';
import { BlockUser, allUsers } from '../actions/userActions';

const initialState = {
  loading: false,
  users: [],
  blockUser: [],
  currentPage: 1,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(BlockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.blockUser = action.payload;
      })
      .addCase(BlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
