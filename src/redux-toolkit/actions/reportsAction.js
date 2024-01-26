import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const allReports = createAsyncThunk('report/allReports', async (_, { rejectWithValue }) => {
  const authToken = localStorage.getItem('token');

  try {
    const response = await setupApiInterceptor(
      '/admin/reports',
      'GET',
      {},
      {
        Authorization: `Bearer ${authToken}`,
      }
    );

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
