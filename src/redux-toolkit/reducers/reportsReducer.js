import { createSlice } from '@reduxjs/toolkit';
import {
  allReports,
  reportedPosts,
  reportedComments,
  reportedPostData,
  reportedCommentsData,
  commentsByCommentId,
  deletePost,
  deleteComment,
} from '../actions/reportsAction';

const initialState = {
  loading: false,
  reports: [],
  reportedPostComment: [],
  reportedPostInfo: [],
  reportedCommentInfo: [],
  commentsData: [],
  deleted: [],
  error: null,
};

const reportsSlice = createSlice({
  name: 'Reports',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    setdataStateEmpty: (state) => {
      state.reportedPostInfo = [];
      state.reportedCommentInfo = [];
    },
    setcommentsData: (state) => {
      state.commentsData = [];
    },
    setdeletedState: (state) => {
      state.deleted = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(allReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(allReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(allReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(reportedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedPostComment = action.payload;
      })
      .addCase(reportedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(reportedComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportedComments.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedPostComment = action.payload;
      })
      .addCase(reportedComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(reportedPostData.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportedPostData.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedPostInfo = action.payload;
      })
      .addCase(reportedPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(reportedCommentsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportedCommentsData.fulfilled, (state, action) => {
        state.loading = false;
        state.reportedCommentInfo = action.payload;
      })
      .addCase(reportedCommentsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(commentsByCommentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(commentsByCommentId.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsData = action.payload;
      })
      .addCase(commentsByCommentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.meta;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.meta;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearErrors, setdataStateEmpty, setcommentsData, setdeletedState } =
  reportsSlice.actions;
export default reportsSlice.reducer;
