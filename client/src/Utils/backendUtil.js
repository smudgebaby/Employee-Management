export const signUpUser = async (username, email, password) => {

  try {
    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password })
    });

    return response.ok;
    
  } catch (error) {
    console.error('Error signing up:', error);
  }
};


export const signInUser = async (email, password) => {

  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    
    const data = await response.json();

    return data;
    
  } catch (error) {
    console.error('Error signing in:', error);
  }
};