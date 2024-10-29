import { api } from './tokenUtils';

// Send Friend Request
const sendFriendRequest = async (user_id2) => {
  try {
    const response = await api.post('/friends/send', {user_id2});
    return response.data;
  } catch (error) {
    console.error('Error with sendFriendRequest API call:', error);
    throw error;
  }
};

// Update Friend Request (accept/reject)
const updateFriendRequest = async (id, status) => {
  try {
    const response = await api.put(`/friends/update/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error with updateFriendRequest API call:', error);
    throw error;
  }
};

// Get Pending Friend Requests
const getPendingFriendRequests = async () => {
  try {
    const response = await api.get(`/friends/pending`);
    return response.data;
  } catch (error) {
    console.error('Error with getPendingFriendRequests API call:', error);
    throw error;
  }
};

// Cancel Friend Request
const cancelFriendRequest = async (id) => {
  try {
    const response = await api.delete(`/friends/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error with cancelFriendRequest API call:', error);
    throw error;
  }
};

// Get User's Friends
const getUserFriends = async () => {
  try {
    const response = await api.get(`/friends/friends`);
    return response.data;
  } catch (error) {
    console.error('Error with getUserFriends API call:', error);
    throw error;
  }
};


const deleteUserFriend = async (id) => {
  try {
    const response = await api.delete(`/friends/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error with deleteUserFriend API call:', error);
    throw error;
  }
};

const checkFriendship = async (id) => {
    try {
      const response = await api.get(`/friends/checkFriendship/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error with checkFriendship API call:', error);
      throw error;
    }
  };

export { 
  sendFriendRequest,
  updateFriendRequest,
  getPendingFriendRequests,
  cancelFriendRequest,
  getUserFriends,
  deleteUserFriend,
  checkFriendship
};
