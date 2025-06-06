const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      console.log('No Authorization header found');
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token extracted:', token ? 'Token present' : 'No token');
    
    if (!token) {
      console.log('No token found in Authorization header');
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token
    console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret is set' : 'Secret is missing');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(401).json({ error: 'Token is not valid' });
  }
}; 