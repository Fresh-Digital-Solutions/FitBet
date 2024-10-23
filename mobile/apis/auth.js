import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.1.81:4000/v1/auth';

// Save the token in SecureStore
const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

// Sign-up API
const signup = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    // Save the token in SecureStore
    if (result.token) {
      await saveToken('accessToken', result.token);
    }

    return result;
  } catch (error) {
    console.error('Error with signup API call:', error);
    throw error;
  }
};

// Login API
const login = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    // Save the token in SecureStore
    if (result.token) {
      await saveToken('accessToken', result.token);
    }

    return result;
  } catch (error) {
    console.error('Error with login API call:', error);
    throw error;
  }
};

// Retrieve token from SecureStore
const getToken = async (key) => {
  return await SecureStore.getItemAsync(key);
};

module.exports = {
  signup,
  login,
  getToken,
};