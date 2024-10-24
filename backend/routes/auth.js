const express = require('express');
const passport = require('../passportConfig');
const authenticateToken = require('../middleware/authenticateToken');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});


router.post('/register', authLimiter, registerUser);

router.post('/login', 
  authLimiter,
  passport.authenticate('local', { 
    session: false,
    failWithError: true 
  }),
  loginUser,
  (error, req, res, next) => {
    res.status(401).json({ 
      message: 'Invalid credentials',
      code: 'INVALID_CREDENTIALS'
    });
  }
);

router.post('/logout', authenticateToken, logoutUser);

module.exports = router;