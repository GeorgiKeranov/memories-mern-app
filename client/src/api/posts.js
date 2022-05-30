export const getPosts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
  
  return await response.json();
}

export const savePost = async (postData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });
  
  return await response.json();
}

export const updatePost = async ({postId, postData}) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });
  
  return await response.json();
}

export const removePost = async (postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    method: 'DELETE'
  });
  
  return await response.json();

}