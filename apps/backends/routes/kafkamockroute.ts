import express, { Request, Response } from 'express';
const router = express.Router();
import  {sendTransactionEvent}  from '/Users/soumya/Documents/my-monorepo/apps/backends/kafka/producer/transactionproducer';

// Define user type
interface AuthenticatedUser {
  userId: number;
}

// Extend Express Request to include `user`
interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// Define a type for the transaction data
interface TransactionData {
  userId: number;
  amount: number;
  transactionType: string;
  timestamp: number;
  status: string;
}

router.post('/', async function (req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user || !req.user.userId) {
    res.status(401).send('Unauthorized: User not authenticated');
    return;
  }

  const userId: number = req.user.userId;

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