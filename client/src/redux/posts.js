import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', postsApi.getPosts);
export const savePost = createAsyncThunk('posts/savePost', postsApi.savePost);
export const updatePost = createAsyncThunk('posts/updatePost', postsApi.updatePost);
export const removePost = createAsyncThunk('posts/removePost', postsApi.removePost);

const logError = (state, action) => {
  console.log(action.error);
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: [],
    isLoading: true,
    postToEdit: null
  },
  reducers: {
    setPostToEdit: (state, action) => {
      state.postToEdit = action.payload;
    }
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.value = [];
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.value = action.payload
      state.isLoading = false
    },
    [getPosts.rejected]: (state, action) => {
      console.log(action.error);

      state.isLoading = false;
    },
    [savePost.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },
    [savePost.rejected]: logError,
    [updatePost.fulfilled]: (state, action) => {
      const savedPost = action.payload;

      state.value = state.value.map(post => {
        if (post._id === savedPost._id) {
          return savedPost;
        }

        return post;
      });
    },
    [updatePost.rejected]: logError,
    [removePost.fulfilled]: (state, action) => {
      const savedPost = action.payload;
      
      state.value = state.value.filter(post => post._id !== savedPost._id);
    },
    [removePost.rejected]: logError
  }
});

export const { setPostToEdit } = postsSlice.actions;

export default postsSlice.reducer;