import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const loginFn = createAsyncThunk('admin/login', async (values) => {
  /* eslint-disable */
  try {
    const response = await setupApiInterceptor('/auth/login', 'POST', values, {});

    return response;
  } catch (error) {
    throw error;
  }
});
