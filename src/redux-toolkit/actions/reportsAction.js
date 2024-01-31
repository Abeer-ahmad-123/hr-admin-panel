import { createAsyncThunk } from '@reduxjs/toolkit';

export const allReports = createAsyncThunk(
  'report/allReports',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        '/admin/reports',
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
