const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const express = require('express');

const checkuserexists = async function (req, res, next) {
const {emailid} = req.body;
try{
const exisitinguser = await model.findOne({emailid:emailid})
if(exisitinguser){
return res.status(400).json({message:"User already exists"})
}
next();
}catch(err){
res.status(500).json({message:"Internal server error"})
console.log(err)
}
}
module.exports = checkuserexists;