import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts';

export default configureStore({
  reducer: {
    posts: postsReducer
  }
});
