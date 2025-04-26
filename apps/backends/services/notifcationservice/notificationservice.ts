import amqp, { Channel, Connection } from 'amqplib/callback_api';

let channel: Channel | null = null;

function getChannel(): Channel | null {
  return channel;
}

function connectToRabbit(): void {
  amqp.connect('amqp://localhost', (err: any, connection: Connection) => {
    if (err) {
      console.error('Error connecting to RabbitMQ:', err);
      return;
    }

    connection.createChannel((err: any, ch: Channel) => {
      if (err) {
        console.error('Error creating channel:', err);
        return;
      }

      const queue = 'registrationqueue';
      ch.assertQueue(queue, { durable: true }); // making the queue durable
      console.log('Queue is ready');
      channel = ch;
    });
  });
}

export { connectToRabbit, getChannel };
