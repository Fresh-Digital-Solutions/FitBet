const express = require('express');
const { 
    cancelFriendRequest, 
    deleteUserFriend, 
    getUserFriends, 
    pendingFriendRequests, 
    sendFriendRequest, 
    updateFriendRequest,
    checkFriendship 
} = require('../controllers/friendshipController');

const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Route to send a friend request
router.post('/send', authenticateToken, sendFriendRequest);

// Route to update a friend request (accept/reject)
router.patch('/update/:id', authenticateToken, updateFriendRequest);

// Route to get all pending friend requests for a user
router.get('/pending', authenticateToken, pendingFriendRequests);

// Route to cancel a pending friend request
router.delete('/cancel/:id', authenticateToken, cancelFriendRequest);

// Route to get a user's friends
router.get('/friends', authenticateToken, getUserFriends);

// Route to delete (or soft delete) a user’s friend
router.delete('/delete/:id', authenticateToken, deleteUserFriend);

router.get('/checkFriendship/:id', authenticateToken, checkFriendship);

module.exports = router;
