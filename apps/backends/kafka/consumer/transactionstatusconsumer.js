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
exports.connectStatusConsumer = void 0;
const kafkajs_1 = require("kafkajs"); // Import Kafka types
const transactions_1 = __importDefault(require("../../config/model/transactions"));
// Kafka consumer types
const kafka = new kafkajs_1.Kafka({
    clientId: 'transaction-status-client',
    brokers: ['localhost:9092'], // Update with your Kafka broker address
});
const consumer = kafka.consumer({ groupId: 'transaction-status-group' }); // Typed Kafka consumer
// Connect to Kafka and consume messages
const connectStatusConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({ topic: 'transaction-status', fromBeginning: true });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                const statusUpdate = JSON.parse(((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || '{}');
                try {
                    // Update the transaction status in the database
                    const updatedTransaction = yield transactions_1.default.findOneAndUpdate({ transactionId: statusUpdate.transactionId }, { $set: { status: statusUpdate.status } }, { new: true });
                    if (updatedTransaction) {
                        console.log('✅ Transaction updated in DB:', updatedTransaction);
                    }
                    else {
                        console.log('No transaction found to update for transactionId:', statusUpdate.transactionId);
                    }
                }
                catch (err) {
                    console.error('Error in updating transaction status:', err);
                }
            }),
        });
    }
    catch (err) {
        console.error('Error in connecting to Kafka or running consumer:', err);
    }
});
exports.connectStatusConsumer = connectStatusConsumer;
