import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/utils/interceptors';
//-----------------------------------------------------------------------
export const loginFn = createAsyncThunk('admin/login', async (values) => {
  //   console.log('values', values);
  try {
    const response = await setupApiInterceptor('/auth/login', {}, values, 'POST');
    console.log('the response', response);
    localStorage.setItem('token', response?.token);
    // prettier-ignore
    localStorage.setItem('refresh-token', response["refresh-token"]);

    return response;
  } catch (error) {
    console.log(' the reducer error is ', error);
    throw error;
  }
});
