const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../utils/generateTokens');

const prisma = new PrismaClient();

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || user.refreshTokenVersion !== decoded.version) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
};

module.exports = refreshToken;