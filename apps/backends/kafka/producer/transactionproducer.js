const kafka = require("/Users/soumya/Documents/my-monorepo/apps/backends/kafka/kafkaclient.js")
const producer = kafka.producer()// connectiong to kafka


///connecting the producer
const connectproducer = async function () {
    await producer.connect();
    console.log("kafka producer connected");
}
const sendtransactionevent  = async function(transacationdata){
    await producer.send({
        topic: 'transaction',
        messages:[{
            key:String(transacationdata.userId),
            value: JSON.stringify(transacationdata)
        }]
        
    });
    console.log(`Transaction sent to user id ${transacationdata.userId}`);
}
module.exports = {connectproducer,sendtransactionevent}