const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../utils/generateTokens');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        
        if (!accessToken) {
            return res.status(401).json({ 
                message: 'Access token is required',
                code: 'NO_TOKEN'
            });
        }

        try {
            // First try to verify the access token
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
            
        } catch (accessError) {
            // Handle access token verification failure
            if (accessError.name === 'TokenExpiredError') {
                // If access token is expired, check refresh token
                const refreshToken = req.headers['x-refresh-token'];
                
                if (!refreshToken) {
                    return res.status(401).json({ 
                        message: 'Refresh token is required',
                        code: 'NO_REFRESH_TOKEN'
                    });
                }

                try {
                    // Verify refresh token
                    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                    
                    // Get user from database to check version
                    const user = await prisma.user.findUnique({
                        where: { id: decoded.id },
                        select: {
                            id: true,
                            email: true,
                            refreshTokenVersion: true,
                            name: true
                        }
                    });

                    if (!user) {
                        return res.status(401).json({ 
                            message: 'User not found',
                            code: 'USER_NOT_FOUND'
                        });
                    }

                    // Check if refresh token version matches
                    if (user.refreshTokenVersion !== decoded.version) {
                        return res.status(401).json({ 
                            message: 'Refresh token has been invalidated',
                            code: 'TOKEN_VERSION_MISMATCH'
                        });
                    }

                    // Generate new access token
                    const newAccessToken = generateAccessToken(user);
                    
                    // Attach user to request and send new access token
                    req.user = user;
                    res.setHeader('x-new-access-token', newAccessToken);
                    
                    return next();
                    
                } catch (refreshError) {
                    if (refreshError.name === 'TokenExpiredError') {
                        return res.status(401).json({ 
                            message: 'Refresh token has expired',
                            code: 'REFRESH_TOKEN_EXPIRED'
                        });
                    }
                    return res.status(401).json({ 
                        message: 'Invalid refresh token',
                        code: 'INVALID_REFRESH_TOKEN'
                    });
                }
            }
            
            return res.status(401).json({ 
                message: 'Invalid access token',
                code: 'INVALID_ACCESS_TOKEN'
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            code: 'SERVER_ERROR'
        });
    }
};

module.exports = authenticateToken;