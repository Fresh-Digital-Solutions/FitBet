const express = require('express');
const passport = require('../passportConfig');
const verifyToken = require('../middleware/verifyToken');
const refreshToken = require('../middleware/refreshToken');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', passport.authenticate('local', { session: false }), loginUser);

// Refresh token route
router.post('/refresh-token', refreshToken);

// Logout route
router.post('/logout', verifyToken, logoutUser);

module.exports = router;