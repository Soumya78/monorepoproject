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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runConsumer = void 0;
const kafkajs_1 = require("kafkajs"); // Import Kafka types
const mockpsp_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/service/mockpsp");
const uuid_1 = require("uuid");
const transactions_1 = __importDefault(require("../../config/model/transactions"));
const kafka = new kafkajs_1.Kafka({
    clientId: 'transaction-client',
    brokers: ['localhost:9092'], // Add your Kafka broker address here
});
const producer = kafka.producer(); // Typed Kafka producer
const consumer = kafka.consumer({ groupId: 'transaction-group' }); // Typed Kafka consumer
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect consumer and producer
        yield consumer.connect();
        yield producer.connect();
        // Subscribe to the 'transaction' topic
        yield consumer.subscribe({ topic: 'transaction', fromBeginning: true });
        // Process messages from Kafka
        yield consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
                var _b;
                try {
                    // Parse message data
                    const transactionData = JSON.parse(((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || '{}');
                    // Generate transactionId if not provided
                    transactionData.transactionId = transactionData.transactionId || (0, uuid_1.v4)();
                    // Save the transaction to the database
                    yield transactions_1.default.create({
                        transactionId: transactionData.transactionId,
                        userId: transactionData.userId,
                        amount: transactionData.amount,
                        status: 'PENDING',
                        timestamp: transactionData.timestamp,
                    });
                    // Process the transaction using PSP service
                    const pspResponse = yield (0, mockpsp_1.processtransaction)(transactionData);
                    // Send the transaction status to the 'transaction-status' topic
                    yield producer.send({
                        topic: 'transaction-status',
                        messages: [
                            {
                                key: transactionData.transactionId,
                                value: JSON.stringify(Object.assign(Object.assign({}, transactionData), { status: pspResponse === null || pspResponse === void 0 ? void 0 : pspResponse.status })),
                            },
                        ],
                    });
                    console.log('📤 Sent transaction status:', pspResponse === null || pspResponse === void 0 ? void 0 : pspResponse.status);
                }
                catch (err) {
                    console.error('Error in processing transaction', err);
                }
            }),
        });
    }
    catch (err) {
        console.error('Error in consumer or producer connection', err);
    }
});
exports.runConsumer = runConsumer;
