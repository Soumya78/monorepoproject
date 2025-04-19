module.exports = (req, res, next) => {
    const { username, emailid, password } = req.body;
  
    if (!username || !emailid || !password) {
      console.log('Missing required fields:', { username, emailid, password });
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    next();
  };
  