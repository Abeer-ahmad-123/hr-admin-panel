import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/utils/interceptors';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    const response = await setupApiInterceptor(
      '/auth/login',
      {
        'Content-Type': 'application/json',
      },
      { email, password },
      'POST'
    );

    localStorage.setItem('access-token', response?.token);
    localStorage.setItem('refresh-token', response['refresh-token']);

    return response;
});
