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

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const editChannel = createAsyncThunk(
  'channel/editChannel',
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

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const channelById = createAsyncThunk(
  'channel/channelById',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/channels/${params.channelId}/posts?page=${params.page}&loadReactions=${true}`,
        'GET',
        {},
        {}
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const PostsByUserId = createAsyncThunk(
  'posts/PostsByUserId',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/posts/${params.id}?loadUser=${true}&loadReactions=${true}`,
        'GET',
        {},
        {}
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const delchannelPost = createAsyncThunk(
  'channelpost/delChannelPost',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/admin/posts/${params.post_id}`,
        'DELETE',
        {},
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const getpostComments = createAsyncThunk(
  'getpostComments/getpostComments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/posts/${
          params.id
        }/comments? loadUser=${true}&loadReactions=${true}&loadNestedComments=${true}&loadNestedUser=${true}&loadNestedReactions=${true}&nestedLimit=10&pageSize=${100}`,
        'GET',
        {},
        {}
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const delComment = createAsyncThunk(
  'delComment/delComment',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/admin/comments/${params.id}`,
        'DELETE',
        {},
        {
          Authorization: `Bearer ${params.authToken}`,
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue();
    }
  }
);
