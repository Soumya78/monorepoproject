import express, { Request, Response } from 'express';
const router = express.Router();
import  {sendTransactionEvent}  from '/Users/soumya/Documents/my-monorepo/apps/backends/kafka/producer/transactionproducer.ts';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

// Define user type
interface AuthenticatedUser {
  userId: string;
}

// Extend Express Request to include `user`
interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// Define a type for the transaction data
interface TransactionData {
  transactionId: string ;
  fromupid: string;
  toupiid: string;
  currency: string;
  userId: string;
  amount: number;
  transactionType: string;
  timestamp: Date;
  status: string;
}

router.post('/', async function (req: AuthenticatedRequest, res: Response): Promise<void> {
const {amount,fromupid,toupiid} = req.body;
if(!amount || amount <= 0) {
  res.status(400).send('Invalid amount');
  return;
}

  const userId = uuidv4();

  const transactionData: TransactionData = {
    transactionId:  uuidv4(),
    fromupid,
    toupiid,
    currency:'INR',
    userId,
    amount: req.body.amount,
    transactionType: req.body.transactionType || 'DEPOSIT',
    timestamp:new Date(),
    status: 'PENDING',
  };

  console.log('Transaction data:', transactionData);
  console.log('Sending transaction to Kafka...');

  try {
    await sendTransactionEvent(transactionData);
    res.status(200).send('Transaction sent to Kafka');
  } catch (err) {
    console.error('Error sending transaction to Kafka:', err);
    res.status(
      500
    ).send('Error sending transaction to Kafka');
  }
});
export default router;