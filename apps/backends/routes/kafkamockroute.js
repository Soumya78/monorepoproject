const express = require('express');
const router = express.Router();
const {connectproducer,sendtransactionevent} = require('../kafka/producer/transactionproducer.js');

router.post('/', async function (req, res) {

  const userid = req.user.userId;
    const transactionData = {
        userId: 12345,
        amount: 500,
        transactionType: "DEPOSIT",
        timestamp: Date.now(),
        status: "PENDING",
      };
     
      console.log("Transaction sending to Kafka");
      try{
        await sendtransactionevent(transactionData);
        res.send(" Transaction sent to Kafka");
      }catch(err){
        console.log("Error sending transaction to Kafka", err);
        return res.status(500).send("Error sending transaction to Kafka");
      }
      

})

module.exports = router;