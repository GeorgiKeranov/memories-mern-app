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

const initialFormData = {title: '', message: '', tags: ''};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    filter: {
      page: 1,
      title: '',
      tags: '',
    },
    numberOfPages: 0,
    arePostsLoading: true,
    formData: initialFormData,
    isFormInEditMode: false,
    isFormLoading: false
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setFormDataInEditMode: (state, action) => {
      state.isFormInEditMode = true;
      
      if (action.payload.tags) {
        const formData = {...action.payload};
        formData.tags = '#' + formData.tags.join(' #');
        state.formData = formData;
        return;
      }
      
      state.formData = action.payload;
    },
    resetFormData: state => {
      state.isFormInEditMode = false;
      state.formData = initialFormData;
    },
    setFilterFields: (state, action) => {
      state.filter = {...state.filter, ...action.payload};
    }
  },
  extraReducers: {
    // Get Posts
    [getPosts.pending]: (state) => {
      state.posts = [];
      state.arePostsLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.numberOfPages = action.payload.numberOfPages;
      state.arePostsLoading = false;
    },
    [getPosts.rejected]: (state, action) => {
      logError(state, action);

      state.arePostsLoading = false;
    },

    // Save Post
    [savePost.pending]: state => {
      state.isFormLoading = true;
    },
    [savePost.fulfilled]: (state, action) => {
      state.isFormLoading = false;
      state.formData = initialFormData;
      state.posts.push(action.payload);
    },
    [savePost.rejected]: (state, action) => {
      logError(state, action);
      
      state.isFormLoading = false;
    },

    // Update Post
    [updatePost.pending]: state => {
      state.isFormLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      updatePostsState(state, action);
      state.formData = initialFormData;
      state.isFormInEditMode = false;
      state.isFormLoading = false;
    },
    [updatePost.rejected]: (state, action) =>{
      logError(state, action);

      state.isFormLoading = false;
    },

    // Remove Post
    [removePost.fulfilled]: (state, action) => {
      const savedPost = action.payload;
      
      state.posts = state.posts.filter(post => post._id !== savedPost._id);
    },
    [removePost.rejected]: logError,

    // Like Post
    [likePost.fulfilled]: updatePostsState,
    [likePost.rejected]: logError
  }
});

export const { setFormData, setFormDataInEditMode, resetFormData, setFilterFields } = postsSlice.actions;

export default postsSlice.reducer;