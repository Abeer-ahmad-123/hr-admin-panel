import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const loginFn = createAsyncThunk('admin/login', async (values) => {
  /* eslint-disable */
  try {
    const response = await setupApiInterceptor('/auth/login', {}, values, 'POST');

    localStorage.setItem('token', response?.token);
    localStorage.setItem('refresh-token', response['refresh-token']);

    return response;
  } catch (error) {
    throw error;
  }
});

export const getUserDetails = createAsyncThunk('admin/user-details', async (values) => {
  try {
    const response = await setupApiInterceptor(
      '/auth/getUserDetails',
      { authorization: `Bearer ${values}` },
      {},
      'GET'
    );

    return response;
  } catch (error) {
    throw error;
  }
});
