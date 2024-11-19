import { api } from './tokenUtils';

// Send Bet Request
const sendBetRequest = async ({ user_id2, amount, start_at, ends_at, goal_time, goal_start_time, goal_end_time }) => {
  try {
    const response = await api.post('/bets/send-bet', { user_id2, amount, start_at, ends_at, goal_time, goal_start_time, goal_end_time });
    return response.data;
  } catch (error) {
    console.error('Error with sendBetRequest API call:', error);
    throw error;
  }
};

// Update Bet Request (accept/reject)
const updateBetRequest = async (id, status) => {
  try {
    const response = await api.put(`/bets/update-bet/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error with updateBetRequest API call:', error);
    throw error;
  }
};

// Get Pending Bet Requests Received by the User
const getPendingBetRequests = async () => {
  try {
    const response = await api.get('/bets/pending-bets');
    return response.data;
  } catch (error) {
    console.error('Error with getPendingBetRequests API call:', error);
    throw error;
  }
};

// Cancel Bet Request
const cancelBetRequest = async (id) => {
  try {
    const response = await api.delete(`/bets/cancel-bet/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error with cancelBetRequest API call:', error);
    throw error;
  }
};

// Get All Accepted Bets for the User
const getUserAllBets = async () => {
  try {
    const response = await api.get('/bets/bets/all-bets');
    return response.data;
  } catch (error) {
    console.error('Error with getUserAllBets API call:', error);
    throw error;
  }
};

// Get User's Active Bet
const getUserActiveBet = async () => {
  try {
    const response = await api.get('/bets/active-bet');
    return response.data;
  } catch (error) {
    console.error('Error with getUserActiveBet API call:', error);
    throw error;
  }
};

// Get Completed Bets for the User
const getUserCompletedBets = async () => {
  try {
    const response = await api.get('/bets/completed-bets');
    return response.data;
  } catch (error) {
    console.error('Error with getUserCompletedBets API call:', error);
    throw error;
  }
};

// Get Pending Bet Requests Sent by the User
const getUserPendingBetsSent = async () => {
  try {
    const response = await api.get('/bets/pending-bets-sent');
    return response.data;
  } catch (error) {
    console.error('Error with getUserPendingBetsSent API call:', error);
    throw error;
  }
};

// Get Workout Goal Associated with a Specific Bet
const getUserWorkoutGoal = async (betId) => {
  try {
    const response = await api.get(`/bets/bet/${betId}/workout-goal`);
    return response.data;
  } catch (error) {
    console.error('Error with getUserWorkoutGoal API call:', error);
    throw error;
  }
};

export {
  sendBetRequest,
  updateBetRequest,
  getPendingBetRequests,
  cancelBetRequest,
  getUserAllBets,
  getUserActiveBet,
  getUserCompletedBets,
  getUserPendingBetsSent,
  getUserWorkoutGoal,
};
