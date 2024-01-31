import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const loginFn = createAsyncThunk('admin/login', async (values) => {
  /* eslint-disable */
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: values.email,
      password: values.password,
    });

    return response?.data?.data;
  } catch (error) {
    throw error;
  }
});

export const refreshTokenFn = createAsyncThunk('admin/refreshToken', async (refreshToken) => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/refreshToken`,
      {},
      { headers: { refreshToken } }
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
});
