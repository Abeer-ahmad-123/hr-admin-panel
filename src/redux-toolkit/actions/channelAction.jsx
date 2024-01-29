import { createAsyncThunk } from '@reduxjs/toolkit';
import SetupApiInterceptor from 'src/services/interceptors';

export const allChannels = createAsyncThunk(
  'channel/allChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SetupApiInterceptor('/channels', 'GET', {}, {});

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
