import axiosRequest from './axiosRequest';

export const getPosts = async () => {
  const response = await axiosRequest.get('/posts');
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
