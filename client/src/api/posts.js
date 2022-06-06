import axiosRequest from './axiosRequest';
import * as postsSlice from '../redux/posts';

export const getPosts = async (page, thunkAPI) => {
  if (page) {
    thunkAPI.dispatch(postsSlice.setFilterFields({page}));
  }

  const state = thunkAPI.getState();
  const filter = {...state.posts.filter};

  if (filter.tags) {
    // Split tags by '#' and remove whitespace before and after every tag
    filter.tags = filter.tags.split('#').map(tag => tag.trim());
    // Remove the empty tags and then join them by ';'
    filter.tags = filter.tags.filter(tag => tag).join(';');
  }

  const response = await axiosRequest.get('/posts', {params: filter});
  return response.data;
}

export const getRecommendedPosts = async ({excludedPostId, tags}) => {
  try {
    tags = tags.join(';');
    const response = await axiosRequest.get('/posts/recommended', {params: {excludedPostId, tags}});
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getPostById = async (id) => {
  try {
    const response = await axiosRequest.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const savePost = async (postData, thunkAPI) => {
  const response = await axiosRequest.post('/posts', postData);
  
  thunkAPI.dispatch(postsSlice.setFilterFields({page: 1, title: '', tags: ''}));
  thunkAPI.dispatch(postsSlice.getPosts());
  
  return response.data;
}

export const commentOnPost = async ({postId, comment}) => {
  try {
    const response = await axiosRequest.post(`/posts/${postId}/comment`, {comment});
    return response.data.comments;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updatePost = async ({postId, postData}) => {
  const response = await axiosRequest.patch(`/posts/${postId}`, postData);
  return response.data;
}

export const removePost = async (postId, thunkAPI) => {
  const response = await axiosRequest.delete(`/posts/${postId}`);  

  thunkAPI.dispatch(postsSlice.getPosts());

  return response.data;
}

export const likePost = async (id) => {
  const response = await axiosRequest.patch(`/posts/${id}/like`);
  return response.data;
}
