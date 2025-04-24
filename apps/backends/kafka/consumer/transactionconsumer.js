const kafka = require("/Users/soumya/Documents/my-monorepo/apps/backends/kafka/kafkaclient.js")
const {processtransaction}= require("/Users/soumya/Documents/my-monorepo/apps/backends/service/mockpsp.js")
const{v4:uuidv4}= require("uuid")
const producer = kafka.producer()// connectiong to kafka
const consumer = kafka.consumer({ groupId: 'transaction-group' })// connectiong to kafka
const Transaction = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/transactions.js')

const runconsumer = async function () {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({ topic: 'transaction', fromBeginning: true });
   
    await consumer.run({eachMessage:async function ({message}){ try{
        const transactiondata = JSON.parse(message.value.toString());
        transactiondata.transactionId = transactiondata.transactionId || uuidv4(); // generate transactionId if not provided
         await Transaction.create({
         transactionId: transactiondata.transactionId || uuidv4(), // generate transactionId if not provided
           userId: transactiondata.userId,
           amount: transactiondata.amount,
           status: 'PENDING',
           timestamp: transactiondata.timestamp,
       });
        const pspresponse = await processtransaction(transactiondata);
        await producer.send({
           topic:"transaction-status",
           messages:[{
               key:transactiondata.transactionId,
               value:JSON.stringify({
                   ...transactiondata,
                   status:pspresponse.status,
   
               })
           }
   ]
   
        })
        console.log("📤 Sent transaction status:", pspresponse.status);

    }catch(err){
        console.log("Error in processing transaction", err);
        return;
    }
    
    }})
    
}
module.exports = {runconsumer}