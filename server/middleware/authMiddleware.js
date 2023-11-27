const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
  // console.log(req.headers['authorization'])
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// Middleware to authenticate role permission
function isAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
  // console.log(req.headers['authorization'])
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const accountrole = decoded.accountrole;
    if(accountrole === 'admin'){
      next();
      req.user = decoded;
    }
    else if (accountrole === 'user'){
      return res.status(403).json({ message: "You don't have permission to access this resource." });
    }
    else{
      res.status(500).json({ message: 'Internal server error',error});
    }
  });
}

module.exports = { authenticateToken, isAdmin };