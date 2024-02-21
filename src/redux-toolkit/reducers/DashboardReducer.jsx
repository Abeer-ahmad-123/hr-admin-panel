import { createSlice } from '@reduxjs/toolkit';
import { getDashboardData } from '../actions/DashBoardAction';

const initialState = {
  loading: false,
  dashboardData: [],
  error: null,
};

const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default dashboardSlice.reducer;
