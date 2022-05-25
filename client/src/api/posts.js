export const fetchPosts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}posts`);
  const data = await response.json();

  return data;
}