import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.1.81:4000/v1';

export const saveToken = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getToken = async (key) => {
  return await SecureStore.getItemAsync(key);
};

export const deleteToken = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

// Refresh access token
const refreshAccessToken = async () => {
  const refreshToken = await getToken('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {}, {
      headers: { 'x-refresh-token': refreshToken },
    });
    const newAccessToken = response.data.accessToken;

    if (newAccessToken) {
      await saveToken('accessToken', newAccessToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['x-new-access-token'];
    if (newAccessToken) {
      saveToken('accessToken', newAccessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Attempt to refresh token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }

      // Delete tokens if refresh fails
      await deleteToken('accessToken');
      await deleteToken('refreshToken');
    }
    return Promise.reject(error);
  }
);

export { api };
