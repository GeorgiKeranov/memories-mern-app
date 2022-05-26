import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, createPost } from '../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', fetchPosts);
export const savePost = createAsyncThunk('posts/savePost', createPost);

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
    [savePost.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    }
  }
});

export default postsSlice.reducer;