const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};