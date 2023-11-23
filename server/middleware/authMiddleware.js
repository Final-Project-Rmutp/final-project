const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
  console.log(req.headers['authorization'])
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.id = decoded.id;
    next();
  });
}

module.exports = { authenticateToken };