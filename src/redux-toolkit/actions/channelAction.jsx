import { createAsyncThunk } from '@reduxjs/toolkit';

export const allChannels = createAsyncThunk(
  'channel/allChannels',
  async (method, { rejectWithValue }) => {
    try {
      const response = await method('/channels', 'GET', {}, {});

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
