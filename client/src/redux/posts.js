import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', fetchPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: [],
    isLoading: true
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.value = action.payload
      state.isLoading = false
    },
    [getPosts.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});

export default postsSlice.reducer;