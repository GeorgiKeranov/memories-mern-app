import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import postsReducer from './posts';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  }
});
