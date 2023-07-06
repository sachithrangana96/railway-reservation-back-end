const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
exports.authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    // Attach the decoded token to the request object for further use
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  });
};
