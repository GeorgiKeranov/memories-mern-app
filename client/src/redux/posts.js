import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsApi from '../api/posts';

export const getPosts = createAsyncThunk('posts/getPosts', postsApi.getPosts);
export const savePost = createAsyncThunk('posts/savePost', postsApi.savePost);
export const updatePost = createAsyncThunk('posts/updatePost', postsApi.updatePost);
export const removePost = createAsyncThunk('posts/removePost', postsApi.removePost);
export const likePost = createAsyncThunk('posts/likePost', postsApi.likePost);

const logError = (state, action) => {
  console.log(action.error);
}

const updatePostsState = (state, action) => {
  const updatedPost = action.payload;

  state.posts = state.posts.map(post => {
    if (post._id === updatedPost._id) {
      return updatedPost;
    }

    return post;
  });
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    arePostsLoading: true,
    postToEdit: null
  },
  reducers: {
    setPostToEdit: (state, action) => {
      state.postToEdit = action.payload;
    }
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.posts = [];
      state.arePostsLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload
      state.arePostsLoading = false
    },
    [getPosts.rejected]: (state, action) => {
      console.log(action.error);

      state.arePostsLoading = false;
    },
    [savePost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    },
    [savePost.rejected]: logError,
    [updatePost.fulfilled]: updatePostsState,
    [updatePost.rejected]: logError,
    [removePost.fulfilled]: (state, action) => {
      const savedPost = action.payload;
      
      state.posts = state.posts.filter(post => post._id !== savedPost._id);
    },
    [removePost.rejected]: logError,
    [likePost.fulfilled]: updatePostsState,
    [likePost.rejected]: logError
  }
});

export const { setPostToEdit } = postsSlice.actions;

export default postsSlice.reducer;