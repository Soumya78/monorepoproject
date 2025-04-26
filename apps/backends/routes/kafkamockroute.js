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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const transactionproducer_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/kafka/producer/transactionproducer");
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user || !req.user.userId) {
            res.status(401).send('Unauthorized: User not authenticated');
            return;
        }
        const userId = req.user.userId;
        const transactionData = {
            userId,
            amount: req.body.amount,
            transactionType: req.body.transactionType || 'DEPOSIT',
            timestamp: Date.now(),
            status: 'PENDING',
        };
        console.log('Transaction data:', transactionData);
        console.log('Sending transaction to Kafka...');
        try {
            yield (0, transactionproducer_1.sendTransactionEvent)(transactionData);
            res.status(200).send('Transaction sent to Kafka');
        }
        catch (err) {
            console.error('Error sending transaction to Kafka:', err);
            res.status(500).send('Error sending transaction to Kafka');
        }
    });
});
exports.default = router;
