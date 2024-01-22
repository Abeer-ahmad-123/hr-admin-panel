import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const allUsers = createAsyncThunk('user/allUsers', async (page, { rejectWithValue }) => {
  try {
    const response = await setupApiInterceptor(`/users?page=${page}`, 'GET');

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
