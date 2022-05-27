import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', postsApi.getPosts);
export const savePost = createAsyncThunk('posts/savePost', postsApi.savePost);
export const updatePost = createAsyncThunk('posts/updatePost', postsApi.updatePost);
export const removePost = createAsyncThunk('posts/removePost', postsApi.removePost);

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
    [getPosts.rejected]: (state) => {
      state.isLoading = false;
    },
    [savePost.fulfilled]: (state, action) => {
      state.value.push(action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      const response = action.payload;

      if (response.error) {
        return console.log(response);
      }

      state.value = state.value.map(post => {
        if (post._id === response._id) {
          return response;
        }

        return post;
      });
    },
    [removePost.fulfilled]: (state, action) => {
      const response = action.payload;
      
      if (response.error) {
        return console.log(response);
      }

      state.value = state.value.filter(post => post._id !== response._id);
    }
  }
});

export const { setPostToEdit } = postsSlice.actions;

export default postsSlice.reducer;