const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();


const registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    
    if (!email || !password ) {
      return res.status(400).json({ 
        message: 'All fields are required',
        code: 'MISSING_FIELDS'
      });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        code: 'INVALID_EMAIL'
      });
    }

 
    if (password.length < 8) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long',
        code: 'WEAK_PASSWORD'
      });
    }

    const existingUser = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true }  
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists',
        code: 'USER_EXISTS'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        refreshTokenVersion: 1
      },
      select: {
        id: true,
        email: true,
        refreshTokenVersion: true
      }
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken, 
      refreshToken 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Server error',
      code: 'SERVER_ERROR'
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      accessToken, 
      refreshToken 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Server error',
      code: 'SERVER_ERROR'
    });
  }
};


const logoutUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshTokenVersion: { increment: 1 } },
    });

    res.json({ 
      message: 'Logged out successfully',
      code: 'LOGOUT_SUCCESS'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ 
      message: 'Server error',
      code: 'SERVER_ERROR'
    });
  }
};


const refreshAccessToken = async (req, res) => {
  const refreshToken = req.headers['x-refresh-token'];

  if (!refreshToken) {
    return res.status(401).json({ 
      message: 'Refresh token is required',
      code: 'NO_REFRESH_TOKEN'
    });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userId = decoded.id;

    // Fetch the user and check if the refresh token version matches
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        refreshTokenVersion: true
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Ensure the refresh token version matches
    if (user.refreshTokenVersion !== decoded.version) {
      return res.status(401).json({
        message: 'Refresh token has been invalidated',
        code: 'TOKEN_VERSION_MISMATCH'
      });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);

    // Return the new access token
    res.status(200).json({
      message: 'Access token refreshed',
      accessToken: newAccessToken
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Refresh token expired',
        code: 'REFRESH_TOKEN_EXPIRED'
      });
    }
    res.status(401).json({
      message: 'Invalid refresh token',
      code: 'INVALID_REFRESH_TOKEN'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
};