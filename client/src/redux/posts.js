import { createSlice } from '@reduxjs/toolkit';
// import { fetchPosts } from '../api/posts';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: []
  },
  reducers: {
    getPosts: (state, action) => {
      state.value = [
        { _id: 1, title: 'test 1 '},
        { _id: 2, title: 'test 2 '}
      ];
    }
  }
});

export const { getPosts } = postsSlice.actions;

export default postsSlice.reducer;