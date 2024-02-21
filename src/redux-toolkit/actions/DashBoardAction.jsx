import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDashboardData = createAsyncThunk(
  'dashboard/dashboardData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/admin/dashboardOverview`,
        'GET',
        {},
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
