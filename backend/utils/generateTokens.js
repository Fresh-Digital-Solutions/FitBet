const jwt = require('jsonwebtoken');

//generate Access token
const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        version: user.refreshTokenVersion,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m'})
};

//Generate Refresh Token
const generateRefreshToken = (user) => {
    const payload ={
        id: user.id,
        version: user.refreshTokenVersion,
    };
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d'});
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
}