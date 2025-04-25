const express= require('express');
const mongoose = require('mongoose');
const userSchema = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const router = express.Router();

router.get("/:userid",async function(req,res){
    try{
       const {userid} =  req.params;
         console.log("User id",userid);
       const user = await userSchema.findOne({userid});
       console.log("User found",user);
       if(!user){
        return res.status(404).json({message:"User not found"})
       }else{
        return res.status(200).json({message:"User found",user});
       }
    }catch(err){
        console.log("Error in getting user",err);
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;