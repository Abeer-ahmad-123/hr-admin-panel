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

export const delChannel = createAsyncThunk(
  'channel/delChannel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/channels/${params.channel_id}`,
        'DELETE',
        {},
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );
      window.location.reload();
      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const createChannel = createAsyncThunk(
  'channel/createChannel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        '/channels',
        'POST',
        {
          name: params.channelData.name,
          description: params.channelData.description,
          image_url: params.channelData.image,
        },
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );
      window.location.reload();
      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
export const editChannel = createAsyncThunk(
  'channel/createChannel',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/channels/${params.channel_id}`,
        'PUT',
        {
          name: params.channelData.name,
          description: params.channelData.description,
          image_url: params.channelData.image,
        },
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );
      window.location.reload();
      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
