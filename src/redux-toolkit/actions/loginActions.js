import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';
import axios from 'axios';

export const loginFn = createAsyncThunk('admin/login', async (values) => {
  /* eslint-disable */
  try {
    const response = await setupApiInterceptor('/auth/login', 'POST', values, {});
    console.log('loginapi', response);
    return response;
  } catch (error) {
    throw error;
  }
});

export const refreshToken = createAsyncThunk('auth/isTokenExpired', async (values) => {
  try {
    console.log('token', values.token);
    console.log('refresh token', values.refreshToken);
    const res = await axios.get('https://api.enxsis.com/api/v1/auth/isTokenExpired', {
      headers: {
        Authorization: `Bearer ${values.token}`,
      },
    });
    console.log('when the second api is not call', res);

    if (!res.data.IsExpired) {
      console.log('refresh token', refreshToken);
      if (!values.refreshToken) {
        console.error('Refresh token is missing.');
        return;
      }

      const refreshRes = await axios.post(
        'https://api.enxsis.com/api/v1/auth/refreshToken',
        {},
        {
          headers: {
            refreshToken: values.refreshToken,
          },
        }
      );
      console.log(refreshRes.data.data);
      return refreshRes.data.data;
    } else {
      console.log('Token is expired or invalid.');
    }
  } catch (error) {
    console.log('Errrrr', error);
  }
});
