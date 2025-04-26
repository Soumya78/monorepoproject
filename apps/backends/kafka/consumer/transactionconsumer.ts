import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';  // Import Kafka types
import  {processtransaction}  from '/Users/soumya/Documents/my-monorepo/apps/backends/service/mockpsp';
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../../config/model/transactions';

// Type for the transaction data
interface TransactionData {
  transactionId: string;
  userId: string ;
  amount: number;
  status: string;
  timestamp: Date;
}

// Type for the response from processtransaction function
interface IPSPResponse {
  status: string;
}

const kafka = new Kafka({
  clientId: 'transaction-client',
  brokers: ['localhost:9092'],  // Add your Kafka broker address here
});

const producer: Producer = kafka.producer();  // Typed Kafka producer
const consumer: Consumer = kafka.consumer({ groupId: 'transaction-group' });  // Typed Kafka consumer

const runConsumer = async (): Promise<void> => {
  try {
    // Connect consumer and producer
    await consumer.connect();
    await producer.connect();

    // Subscribe to the 'transaction' topic
    await consumer.subscribe({ topic: 'transaction', fromBeginning: true });

    // Process messages from Kafka
    await consumer.run({
      eachMessage: async ({ message }: { message: KafkaMessage }) => {
        try {
          // Parse message data
          const transactionData: TransactionData = JSON.parse(message.value?.toString() || '{}');

          // Generate transactionId if not provided
          transactionData.transactionId = transactionData.transactionId || uuidv4();

          // Save the transaction to the database
          await Transaction.create({
            transactionId: transactionData.transactionId,
            userId: transactionData.userId,
            amount: transactionData.amount,
            status: 'PENDING',
            timestamp: transactionData.timestamp,
          });

          // Process the transaction using PSP service
          const pspResponse: IPSPResponse | undefined = await processtransaction(transactionData);

          // Send the transaction status to the 'transaction-status' topic
          await producer.send({
            topic: 'transaction-status',
            messages: [
              {
                key: transactionData.transactionId,
                value: JSON.stringify({
                  ...transactionData,
                  status: pspResponse?.status,
                }),
              },
            ],
          });

          console.log('📤 Sent transaction status:', pspResponse?.status);

        } catch (err) {
          console.error('Error in processing transaction', err);
        }
      },
    });
  } catch (err) {
    console.error('Error in consumer or producer connection', err);
  }
};

export { runConsumer };
