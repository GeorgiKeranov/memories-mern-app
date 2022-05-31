import axios from 'axios';

const axiosRequest = axios.create({ baseURL: process.env.REACT_APP_API_URL });

axiosRequest.interceptors.request.use((req) => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    req.headers.Authorization = `Bearer ${userData.token}`;
  }

  return req;
});

export default axiosRequest;