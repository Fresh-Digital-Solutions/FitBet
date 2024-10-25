import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.1.81:4000/v1/auth';

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Save the token in SecureStore
const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

// Get the token from SecureStore
const getToken = async (key) => {
  return await SecureStore.getItemAsync(key);
};

// Delete the token from SecureStore
const deleteToken = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

// Request interceptor to add tokens to headers
api.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    // If a new access token is provided in the response headers, save it
    const newAccessToken = response.headers['x-new-access-token'];
    if (newAccessToken) {
      saveToken('accessToken', newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized), retry if new token is provided by middleware
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = error.response.headers['x-new-access-token'];
      if (newAccessToken) {
        // Save the new access token
        await saveToken('accessToken', newAccessToken);
        // Update the original request's Authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request
        return api(originalRequest);
      }

      // If no new token is available, clear stored tokens
      await deleteToken('accessToken');
      await deleteToken('refreshToken');
    }

    return Promise.reject(error);
  }
);

// Sign-up API
const signup = async (data) => {
  try {
    const response = await api.post('/register', data);

    // Save tokens in SecureStore
    if (response.data.accessToken) {
      await saveToken('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      await saveToken('refreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error with signup API call:', error);
    throw error;
  }
};

// Login API
const login = async (data) => {
  try {
    const response = await api.post('/login', data);

    // Save tokens in SecureStore
    if (response.data.accessToken) {
      await saveToken('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      await saveToken('refreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error with login API call:', error);
    throw error;
  }
};

// Logout API
const logout = async () => {
  try {
    const accessToken = await getToken('accessToken');
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const response = await api.post('/logout',  {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Clear both access and refresh tokens from SecureStore after successful logout
    await deleteToken('accessToken');
    await deleteToken('refreshToken');

    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { signup, login, logout, getToken, deleteToken, api };