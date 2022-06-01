import axiosRequest from './axiosRequest';

export async function registerUser(userData, {rejectWithValue}) {
  return sendAuthRequest('/users/register', userData, rejectWithValue);
}

export async function loginUser(userData, {rejectWithValue}) {
  return sendAuthRequest('/users/login', userData, rejectWithValue);
}

async function sendAuthRequest(endpoint, userData, rejectWithValue) {
  try {
    const response = await axiosRequest.post(endpoint, userData);
    const responseData = response.data;
    const user = {...responseData.user, token: responseData.token};
    
    return user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}
