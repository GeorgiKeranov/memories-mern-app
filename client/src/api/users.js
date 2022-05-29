export async function registerUser(userData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}