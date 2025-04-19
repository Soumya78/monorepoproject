const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { emailid, username } = req.body;

  try {
    const payload = {
      emailid,
      username,
      createdAt: new Date().toISOString(),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d',
    });

    req.body.secret = token;
    console.log('Generated token:', token);
    next();
  } catch (err) {
    console.error('Token generation error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
