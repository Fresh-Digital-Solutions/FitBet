import { api } from './tokenUtils';

// Search Users by name or email
const searchUsers = async (query) => {
  try {
    const response = await api.get(`/users/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error with searchUsers API call:', error);
    throw error;
  }
};

// Get a single user's information by ID
const getUser = async () => {
  try {
    const response = await api.get(`/users/getUser`);
    return response.data;
  } catch (error) {
    console.error('Error with getUser API call:', error);
    throw error;
  }
};

// Update a user's information
const updateUser = async (data) => {
  try {
    const response = await api.post(`/users/updateUser`, data);
    return response.data;
  } catch (error) {
    console.error('Error with updateUser API call:', error);
    throw error;
  }
};

// Delete a user (soft delete)
const deleteUser = async () => {
  try {
    const response = await api.post(`/users/deleteUser/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error with deleteUser API call:', error);
    throw error;
  }
};

const getAUser = async (id) => {
    try {
      const response = await api.get(`/users/getUser/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error with getUser API call:', error);
      throw error;
    }
  };

export { searchUsers, getUser, updateUser, deleteUser, getAUser };
