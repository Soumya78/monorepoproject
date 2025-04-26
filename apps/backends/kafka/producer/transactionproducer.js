"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransactionEvent = exports.connectProducer = void 0;
const kafkajs_1 = require("kafkajs"); // Import Kafka types
// Kafka client setup
const kafka = new kafkajs_1.Kafka({
    clientId: 'transaction-producer-client',
    brokers: ['localhost:9092'], // Update with your Kafka broker address
});
const producer = kafka.producer(); // Typed Kafka producer
// Function to connect the producer
const connectProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.connect();
        console.log('Kafka producer connected');
    }
    catch (error) {
        console.error('Error connecting Kafka producer:', error);
    }
});
exports.connectProducer = connectProducer;
// Function to send transaction event
const sendTransactionEvent = (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.send({
            topic: 'transaction',
            messages: [
                {
                    key: String(transactionData.userId),
                    value: JSON.stringify(transactionData),
                },
            ],
        });
        console.log(`Transaction sent to user id ${transactionData.userId}`);
    }
    catch (error) {
        console.error('Error sending transaction event:', error);
    }
});
exports.sendTransactionEvent = sendTransactionEvent;
