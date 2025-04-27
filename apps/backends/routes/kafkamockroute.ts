import express, { Request, Response } from 'express';
const router = express.Router();
import  {sendTransactionEvent}  from '/Users/soumya/Documents/my-monorepo/apps/backends/kafka/producer/transactionproducer.ts';
import { v4 as uuidv4 } from 'uuid';

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
  userId: string;
  amount: number;
  transactionType: string;
  timestamp: number;
  status: string;
}

router.post('/', async function (req: AuthenticatedRequest, res: Response): Promise<void> {
const {amount} = req.body;
if(!amount || amount <= 0) {
  res.status(400).send('Invalid amount');
  return;
}

  const userId = uuidv4();

  const transactionData: TransactionData = {
    userId,
    amount: req.body.amount,
    transactionType: req.body.transactionType || 'DEPOSIT',
    timestamp: Date.now(),
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