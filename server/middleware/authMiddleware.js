const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    const { id } = decoded;
    req.user = { decoded, id };

    // Log successful authentication
    // logging("authentication", id, 'Authentication successful');
    
    next();
  });
}


// Middleware to authenticate role permission
function isAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { account_role, id } = decoded;

    if (account_role === 'admin') {
      req.user = { decoded, id };
      next();
    } else if (account_role === 'user') {
      // Log unauthorized access attempts
      // logging("unauthorizedAccess", id, 'Unauthorized access attempt by a non-admin user');
      return res.status(403).json({ message: "You don't have permission to access this resource." });
    } else {
      // Log unexpected errors
      // logging("unexpectedError", id, 'Unexpected account role encountered');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


// Middleware to authenticate account type permission
function isTeacher(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { account_type, id } = decoded;

    if (account_type === 'teacher') {
      req.user = { decoded, id };
      next();
    } else if (account_type === 'student') {
      // Log unauthorized access attempts
      // logging("unauthorizedAccess", id, 'Unauthorized access attempt by a non-teacher user');
      return res.status(403).json({ message: "You don't have permission to access this resource." });
    } else {
      // Log unexpected errors
      // logging("unexpectedError", id, 'Unexpected account type encountered');
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}


module.exports = { authenticateToken, isAdmin, isTeacher };