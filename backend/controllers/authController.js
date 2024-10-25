const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

const prisma = new PrismaClient();


const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    
    if (!email || !password || !name) {
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
        name,
        refreshTokenVersion: 1
      },
      select: {
        id: true,
        email: true,
        name: true,
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
        name: user.name
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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};