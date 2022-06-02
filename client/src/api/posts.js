import axiosRequest from './axiosRequest';
import { setFilterFields } from '../redux/posts';

export const getPosts = async (page, thunkAPI) => {
  if (page) {
    thunkAPI.dispatch(setFilterFields({page}));
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

export const savePost = async (postData) => {
  const response = await axiosRequest.post('/posts', postData);
  return response.data;
}

export const updatePost = async ({postId, postData}) => {
  const response = await axiosRequest.patch(`/posts/${postId}`, postData);
  return response.data;
}

export const removePost = async (postId) => {
  const response = await axiosRequest.delete(`/posts/${postId}`);  
  return response.data;
}

export const likePost = async (id) => {
  const response = await axiosRequest.patch(`/posts/${id}/like`);
  return response.data;
}
