const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    // Update 1: Check Token Format
    const decoded = jwt.verify(token, 'pssword', { algorithms: ['HS256'] });

    // Update 6: Logging
    console.log('Token:', token);
    console.log('Decoded:', decoded);

    // No changes to the next steps
    req.user = { userId: decoded.userId }; // Wrap userId in an object
    next();
  } catch (error) {
    // Update 3: Handle Token Expiry
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticate;
