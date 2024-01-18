import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/utils/interceptors';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await setupApiInterceptor(
      '/auth/login',
      {
        'Content-Type': 'application/json',
      },
      { email, password },
      'POST'
    );

    // Store both tokens in the local storage
    localStorage.setItem('access-token', response?.token);
    localStorage.setItem('refresh-token', response['refresh-token']);

    return response;
    
  } catch (error) {
    throw error;
  }
});
