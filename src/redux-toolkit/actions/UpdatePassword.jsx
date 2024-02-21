import { createAsyncThunk } from '@reduxjs/toolkit';

export const UpdatePassword = createAsyncThunk(
  'updatepassword',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        '/auth/updatePassword',
        'PUT',
        { newPassword: params.newPassword, oldPassword: params.oldPassword },
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
