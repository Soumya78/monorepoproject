import  { Channel, Connection, Message } from 'amqplib/callback_api';
import amqp from 'amqplib/callback_api';

interface User {
  email: string;
  // Add other fields if your user object has more properties
}

function startConsumer(): void {
  amqp.connect('amqp://localhost', (err: Error | null, connection: Connection) => {
    if (err) {
      console.error('Error in connection:', err);
      return;
    }

    connection.createChannel((err: Error | null, channel: Channel) => {
      if (err) {
        console.error('Error in creating channel:', err);
        return;
      }

      const queue = 'registrationqueue'; // Queue name must match the producer

      channel.assertQueue(queue, {
        durable: true, // Ensure queue survives broker restart
      });

      console.log('Waiting for messages in queue:', queue);

      channel.consume(queue, (msg: Message | null) => {
        if (msg !== null) {
          const user: User = JSON.parse(msg.content.toString());
          console.log('Received user data from queue:', user);

          sendWelcomeEmail(user);

          channel.ack(msg); // Acknowledge message after processing
        }
      });
    });
  });
}

function sendWelcomeEmail(user: User): void {
  // Dummy email sender
  console.log(`Sending welcome email to: ${user.email}`);
}

startConsumer();
