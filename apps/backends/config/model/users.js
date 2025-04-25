const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid');

const userSchema = new mongoose.Schema({
  userid:{type:String, default:() => uuidv4()},
  emailid: String,
  password: String,
  username: String,
  secret:String
});

module.exports = mongoose.model('User', userSchema);
