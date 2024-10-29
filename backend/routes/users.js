const express = require('express');
const { getUser, updateUser, deleteUser, searchUsers, getAUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/getUser', authenticateToken, getUser);
router.post('/updateUser', authenticateToken, updateUser);
router.post('/deleteUser', authenticateToken, deleteUser);
router.get('/search', authenticateToken, searchUsers);
router.get('/getUser/:id', authenticateToken, getAUser);

module.exports = router;
