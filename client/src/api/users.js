export async function registerUser(userData) {
  return sendAuthRequest('/users/register', userData);
}

export async function loginUser(userData) {
  return sendAuthRequest('/users/login', userData);
}

async function sendAuthRequest(endpoint, userData) {
  const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  
  const responseObj = await response.json();
  if (responseObj.error) {
    throw new Error(responseObj.error);
  }
  
  const user = {...responseObj.user, token: responseObj.token};
  
  return user;
}
