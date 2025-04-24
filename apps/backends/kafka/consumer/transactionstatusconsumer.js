const kafka = require('/Users/soumya/Documents/my-monorepo/apps/backends/kafka/kafkaclient.js')
const mongoose = require('mongoose')
const { processtransaction } = require('/Users/soumya/Documents/my-monorepo/apps/backends/service/mockpsp.js')
const Transaction = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/transactions.js')

const consumer = kafka.consumer({groupId: 'transaction-status-group'}) 
const connectstatusconsumer = async function(){
    await consumer.connect();
    await consumer.subscribe({topic:"transaction-status",fromBeginning:true})

    await consumer.run({
     
        eachMessage:async function({topic,partition,message}){
            const statusupdate = JSON.parse(message.value.toString());
            try{
            const updated = await Transaction.findOneAndUpdate({
                transactionId : statusupdate.transactionId,
            },
            {
                $set:{
                    status:statusupdate.status,
                }
            },
            {
        
                new:true,
            })
            const transaction = await Transaction.findOne({ transactionId: statusupdate.transactionId });
            console.log("✅ Transaction updated in DB:", transaction);
          console.log("Transaction found:", transaction);
            }catch(err){
                console.log("Error in updating transaction status",err);
            }

        }
    })
}// connectiong to kafka
module.exports = {connectstatusconsumer}