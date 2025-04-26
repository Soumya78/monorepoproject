"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRabbit = connectToRabbit;
exports.getChannel = getChannel;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
let channel = null;
function getChannel() {
    return channel;
}
function connectToRabbit() {
    callback_api_1.default.connect('amqp://localhost', (err, connection) => {
        if (err) {
            console.error('Error connecting to RabbitMQ:', err);
            return;
        }
        connection.createChannel((err, ch) => {
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
