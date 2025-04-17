const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
require('dotenv').config();


const loginusermiddleware = async function (req, res, next) {
    const { emailid, password } = req.body;
    console.log(process.env.JWT_SECRET_KEY);

    try {
        const user = await model.findOne({ emailid });
  
        if (!user) {
            console.log("User not found for email:", emailid);
            return res.status(400).json({ message: "User not found" });
        }
        const ismatch = await bscrypt.compare(password, user.password);
        
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = loginusermiddleware;




