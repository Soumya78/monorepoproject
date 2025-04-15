const express = require('express');
const router = express.Router();


const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const exisitinguser = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/checkuserexists.js');
console.log('outside register');
router.post('/',exisitinguser,async function(req,res){
    console.log('inside register');
const {username,emailid,password} = req.body

try{
    const newuser = new model({
        username,
        emailid,
        password
    });
    await newuser.save();
    res.status(201).json({message:"User created successfully"})
}catch(err){
    res.status(500).json({message:"Internal server error"})
    console.log(err);
}
})

module.exports = router;