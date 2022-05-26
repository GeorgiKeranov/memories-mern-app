export const fetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}posts`);
    
    return await response.json();
  } catch (error) {
    console.log(error);

    return [];
  }
}

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}