import axiosRequest from './axiosRequest';

export async function registerUser(userData) {
  return sendAuthRequest('/users/register', userData);
}

export async function loginUser(userData) {
  return sendAuthRequest('/users/login', userData);
}

async function sendAuthRequest(endpoint, userData) {
  const response = await axiosRequest.post(endpoint, userData);
  
  const responseData = response.data;
  if (responseData.error) {
    throw new Error(responseData.error);
  }
  
  const user = {...responseData.user, token: responseData.token};
  
  return user;
}
