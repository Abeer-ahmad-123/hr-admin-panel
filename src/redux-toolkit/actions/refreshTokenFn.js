import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const expiredTokenFn = createAsyncThunk('expiredTokenFn', async (authToken) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/isTokenExpired`,

      {
        headers: {
          Authorization: `Bearer${authToken}`,
        },
      }
    );

    return response?.data;
  } catch (error) {
    throw error;
  }
});

export default expiredTokenFn;
