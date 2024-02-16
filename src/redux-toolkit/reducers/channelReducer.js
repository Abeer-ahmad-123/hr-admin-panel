import { createSlice } from '@reduxjs/toolkit';
import {
  allChannels,
  delChannel,
  createChannel,
  editChannel,
  channelById,
  PostsByUserId,
  delchannelPost,
  getpostComments,
  delComment,
} from '../actions/channelAction';

const initialState = {
  loading: false,
  channels: [],
  channelsData: [],
  channelsPostData: [],
  commentsData: [],
  delComments: [],
  error: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannelDataEmpty: (state) => {
      state.channelsPostData = [];
    },
    setChannelsStateEmpty: (state) => {
      state.channelsData = [];
    },
    setDelCommentState: (state) => {
      state.delComments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(allChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(allChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(delChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(delChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.meta;
      })
      .addCase(delChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(delchannelPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(delchannelPost.fulfilled, (state, action) => {
        state.loading = false;
        state.channelsData = action.meta;
      })
      .addCase(delchannelPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(createChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.meta;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(editChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.meta;
      })
      .addCase(editChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(channelById.pending, (state) => {
        state.loading = true;
      })
      .addCase(channelById.fulfilled, (state, action) => {
        state.loading = false;
        state.channelsData = action.payload;
      })
      .addCase(channelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(PostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(PostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.channelsPostData = action.payload;
      })
      .addCase(PostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getpostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getpostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsData = action.payload;
      })
      .addCase(getpostComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(delComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(delComment.fulfilled, (state, action) => {
        state.loading = false;
        state.delComments = action.meta;
      })
      .addCase(delComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const { setChannelDataEmpty, setChannelsStateEmpty, setDelCommentState } =
  channelSlice.actions;
export default channelSlice.reducer;
