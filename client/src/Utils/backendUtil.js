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

    if (data.code !== 200)
      return null;

    return data;
    
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const createEmployeeInfo = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/info/create/${id}` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const data = await response.json();
    console.log(data.data._id)

    return data.data._id;

  } catch (error) {
    console.error('Error updating data:', error.message);
  }
}

export const saveEmployeeInfo = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/info/update/${id}` , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to save data');
    }

    return response.ok

  } catch (error) {
    console.error('Error saving data:', error.message);
  }
}

export const updateUser = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/user/updateById/${id}` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    return response.ok

  } catch (error) {
    console.error('Error saving user data:', error.message);
  }
}



export const getOnboardStatus = async (id) => {
  try {

    const response = await fetch(`http://localhost:3000/user/getById/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching employee data');
    }

    const userInformation = await response.json();
    console.log(userInformation.onboardingStatus.status)
    return userInformation.onboardingStatus.status
    
  } catch (error) {
    console.error('Error saving user data:', error.message);
  }
}