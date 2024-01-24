import { createSlice } from '@reduxjs/toolkit';
import { allReports } from '../actions/reportsAction';

const initialState = {
  loading: false,
  reports: [],
  error: null,
};

const reportsSlice = createSlice({
  name: 'Reports',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(allReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(allReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearErrors } = reportsSlice.actions;
export default reportsSlice.reducer;
