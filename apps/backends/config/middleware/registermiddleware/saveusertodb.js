const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js'); 
const {v4:uuidv4} = require('uuid');// update with your actual path

module.exports = async (req, res,next) => {
  try {
    const {userid, username, emailid, password, secret } = req.body;

    const newUser = new model({
      username,
      emailid,
      password,
      secret,
      userid: userid || uuidv4(), // Generate a new UUID if not provided
    });

    const saveduser = await newUser.save();
    req.saveusertodb = saveduser
    res.status(201).json({ message: 'User created successfully' ,userid : saveduser.userid });
  
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
