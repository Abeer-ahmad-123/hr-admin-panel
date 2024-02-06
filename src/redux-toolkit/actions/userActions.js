import { createAsyncThunk } from '@reduxjs/toolkit';

export const allUsers = createAsyncThunk('user/allUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await params.setupApiInterceptor(`/users?page=${params.page}`, 'GET', {}, {});

    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const BlockUser = createAsyncThunk(`user/block`, async (params) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await params.setupApiInterceptor(
      `/admin/users/${params.id}/block`,
      'PUT',
      {},
      {
        Authorization: `Bearer ${params.token}`,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
});
