import { createSlice } from '@reduxjs/toolkit';
import {
  allChannels,
  delChannel,
  createChannel,
  editChannel,
  channelById,
} from '../actions/channelAction';

const initialState = {
  loading: false,
  channels: [],
  error: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
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
        state.channels = action.payload;
      })
      .addCase(channelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export default channelSlice.reducer;
