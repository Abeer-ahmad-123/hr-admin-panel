import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const allUsers = createAsyncThunk('user/allUsers', async (page, { rejectWithValue }) => {
  try {
    const response = await setupApiInterceptor(`/users?page=${page}`, 'GET', {}, {});

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const BlockUser = createAsyncThunk(`user/block`, async (id, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await setupApiInterceptor(`/admin/users/${id}/block`, 'PUT', id, {
      authorization: `Bearer ${token}`,
    });

    return response;
  } catch (error) {
    throw error;
  }
});
