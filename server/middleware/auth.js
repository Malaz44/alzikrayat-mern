const jwt = require('jsonwebtoken');

// protects a route: checks the "Authorization: Bearer <token>" header
const auth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {
    // verify checks the signature and the expiry date
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // from now on the user id comes from the token, not from the client
    req.userId = payload.id;
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError' ? 'Session expired, please login again' : 'Invalid token';
    res.status(401).json({ message });
  }
};

module.exports = auth;