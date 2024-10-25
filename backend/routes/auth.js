const express = require('express');
const passport = require('../passportConfig');
const authenticateToken = require('../middleware/authenticateToken');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();




router.post('/register', registerUser);

router.post('/login', 
  
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