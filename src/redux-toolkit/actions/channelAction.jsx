import { createAsyncThunk } from '@reduxjs/toolkit';
import setupApiInterceptor from 'src/services/interceptors';

export const allChannels = createAsyncThunk(
  'channel/allChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await setupApiInterceptor('/channels', 'GET', {}, {});

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
