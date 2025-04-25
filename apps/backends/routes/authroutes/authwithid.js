const express= require('express');
const mongoose = require('mongoose');
const userModel = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const router = express.Router();

router.get("/",async function(req,res){
    try{
       const {userid} =  req.params;
       const user = await userModel.findOne({userid});
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