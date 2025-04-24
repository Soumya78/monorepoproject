// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId:{type:String,unique:true,required:true},
  userId: String,
  amount: Number,
  status: {type:String,default:"PENDING"},
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);