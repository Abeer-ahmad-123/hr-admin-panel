import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//-----------------------------------------------------------------------
export const allUsers = createAsyncThunk('user/allUsers', async (_, { rejectWithValue }) => {
  const url = import.meta.env.VITE_REACT_APP_BASE_URL;

  try {
    const response = await axios.get(`${url}/users`);

    console.log('data', response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
