import { createSlice } from '@reduxjs/toolkit';
import { allChannels } from '../actions/channelAction';

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
      });
  },
});
export default channelSlice.reducer;
