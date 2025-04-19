const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js'); // update with your actual path

module.exports = async (req, res,next) => {
  try {
    const { username, emailid, password, secret } = req.body;

    const newUser = new model({
      username,
      emailid,
      password,
      secret,
    });

    const saveduser = await newUser.save();
    req.saveusertodb = saveduser
    next();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
