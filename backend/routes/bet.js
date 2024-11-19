const express = require('express');
const {
    SendBetRequest,
    UpdateBetRequest,
    PendingBetRequest,
    GetUserAllBets,
    CancelBetRequest,
    GetUserBet,
    GetUserCompletedBets,
    GetUserPendingBetsSent,
    GetUserWorkoutGoal,
    createPaymentIntent
} = require('../controllers/bettingController')
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Send a new bet request
router.post('/send-bet', authenticateToken, SendBetRequest);

// Update a bet request (accept/reject) and handle payments if accepted
router.patch('/update-bet/:id', authenticateToken, UpdateBetRequest);

// Get pending bet requests received by the user
router.get('/pending-bets', authenticateToken, PendingBetRequest);

// Get all accepted bets for the user
router.get('/all-bets', authenticateToken, GetUserAllBets);

// Cancel a bet request
router.delete('/cancel-bet/:id', authenticateToken, CancelBetRequest);

// Get the user's active bet
router.get('/active-bet', authenticateToken, GetUserBet);

// Get all completed bets for the user
router.get('/completed-bets', authenticateToken, GetUserCompletedBets);

// Get all pending bet requests sent by the user
router.get('/pending-bets-sent', authenticateToken, GetUserPendingBetsSent);

// Retrieve the workout goal associated with a specific bet
router.get('/bet/:betId/workout-goal', authenticateToken, GetUserWorkoutGoal);


module.exports = router;