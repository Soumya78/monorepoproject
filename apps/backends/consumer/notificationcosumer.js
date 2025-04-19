const amqp = require('amqplib/callback_api');

function startConsumer() {
    amqp.connect('amqp://localhost', function(err, connection) {
        if (err) {
            console.log('Error in connection:', err);
            return;
        }

        connection.createChannel(function(err, channel) {
            if (err) {
                console.log('Error in creating channel:', err);
                return;
            }

            const queue = 'registrationqueue';  // Queue name must match the one you send to in the middleware

            channel.assertQueue(queue, {
                durable: true  // Ensures the queue survives server restarts
            });

            console.log('Waiting for messages in queue:', queue);

            // Listen for messages
            channel.consume(queue, function(msg) {
                if (msg !== null) {
                    const user = JSON.parse(msg.content.toString());
                    console.log('Received user data from queue:', user);

                    // Process the user data (e.g., send a notification or log to a database)
                    // Example: Sending an email, logging, etc.
                    sendWelcomeEmail(user);  // You can replace this with your actual logic

                    // Acknowledge the message to remove it from the queue
                    channel.ack(msg);
                }
            });
        });
    });
}

function sendWelcomeEmail(user) {
    // Dummy function for demonstration
    console.log(`Sending welcome email to: ${user.email}`);
}

startConsumer();
