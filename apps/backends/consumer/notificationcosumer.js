"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
function startConsumer() {
    callback_api_1.default.connect('amqp://localhost', (err, connection) => {
        if (err) {
            console.error('Error in connection:', err);
            return;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                console.error('Error in creating channel:', err);
                return;
            }
            const queue = 'registrationqueue'; // Queue name must match the producer
            channel.assertQueue(queue, {
                durable: true, // Ensure queue survives broker restart
            });
            console.log('Waiting for messages in queue:', queue);
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const user = JSON.parse(msg.content.toString());
                    console.log('Received user data from queue:', user);
                    sendWelcomeEmail(user);
                    channel.ack(msg); // Acknowledge message after processing
                }
            });
        });
    });
}
function sendWelcomeEmail(user) {
    // Dummy email sender
    console.log(`Sending welcome email to: ${user.email}`);
}
startConsumer();
