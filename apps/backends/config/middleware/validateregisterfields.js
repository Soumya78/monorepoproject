module.exports = (req, res, next) => {
    const { username, emailid, password } = req.body;
  
    if (!username || !emailid || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    next();
  };
  