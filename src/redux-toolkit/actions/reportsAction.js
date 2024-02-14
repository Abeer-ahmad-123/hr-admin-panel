import { createAsyncThunk } from '@reduxjs/toolkit';

export const allReports = createAsyncThunk(
  'report/allReports',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        '/admin/reports',
        'GET',
        {},
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

export const reportedPosts = createAsyncThunk(
  'report/reportedPosts',
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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const reportedComments = createAsyncThunk(
  'report/reportedComments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/comments/${
          params?.id
        }?loadUser=${true}&loadReactions=${true}&loadNestedComments=${true}&loadNestedUser=${true}&loadNestedReactions=${true}&allReplies=${true}`,
        'GET',
        {},
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const reportedPostData = createAsyncThunk(
  'reportPostData/reportedPostData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/posts/${
          params?.id
        }/comments?loadUser=${true}&loadReactions=${true}&loadNestedComments=${true}&loadNestedUser=${true}&loadNestedReactions=${true}&nestedLimit=10&page=1&pageSize=${100}`,
        'GET',
        {},
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const reportedCommentsData = createAsyncThunk(
  'reportedCommentsData/reportedCommentsData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/posts/${params?.postId}?loadUser=${true}&loadReactions=${true}`,
        'GET',
        {},
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const commentsByCommentId = createAsyncThunk(
  'commentsByCommentId/commentsByCommentId',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/comments/${
          params?.id
        }?loadUser=${true}&loadReactions=${true}&loadNestedComments=${true}&loadNestedUser=${true}&loadNestedReactions=${true}&allReplies=${true}&nestedPage=${1}&nestedPageSize=${100}`,
        'GET',
        {},
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'deletePost/deletePost',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/posts/${params?.postId}`,
        'DELETE',
        {},
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
export const deleteComment = createAsyncThunk(
  'deleteComment/deleteComment',
  async (params, { rejectWithValue }) => {
    try {
      const response = await params.setupApiInterceptor(
        `/comments/${params?.commentId}`,
        'DELETE',
        {},
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
