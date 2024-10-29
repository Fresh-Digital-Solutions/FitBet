import { api, saveToken, deleteToken, getToken } from './tokenUtils';

// Sign-up API
const signup = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
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
    const response = await api.post('/auth/login', data);
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
    await api.post('/auth/logout');
    await deleteToken('accessToken');
    await deleteToken('refreshToken');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { signup, login, logout };
