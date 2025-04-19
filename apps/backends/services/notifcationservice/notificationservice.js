const amqp = require('amqplib/callback_api');

let channel = null;
function getchannel(){
    return channel;
}


function connecttorabbit(){
    amqp.connect('amqp://localhost',function(err,connection){
        if(err){
            console.log(err);
            return;
        }

        connection.createChannel(function(err,ch){
            if(err){
                console.log(err);
                return ;

            }
            const queue = 'registrationqueue';
            ch.assertQueue(queue,{       ///making the quueue durable 
                durable:true 
            });
            console.log('Queue is ready')
            channel = ch;
        });
    });
}
module.exports = {connecttorabbit,getchannel};