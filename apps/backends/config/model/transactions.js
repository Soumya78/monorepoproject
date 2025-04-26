"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create the transaction schema
const transactionSchema = new mongoose_1.Schema({
    transactionId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'PENDING' },
    timestamp: { type: Date, default: new Date().getTime() },
});
// Create the model using the schema and interface
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
