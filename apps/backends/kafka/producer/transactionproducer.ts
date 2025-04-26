import kafkajs from 'kafkajs'; // Import KafkaJS
const { Kafka} = kafkajs ; // Import Kafka types
import type { Producer, Message } from 'kafkajs';


// Kafka client setup
const kafka = new Kafka({
  clientId: 'transaction-producer-client',
  brokers: ['localhost:9092'],  // Update with your Kafka broker address
});
export interface TransactionData {
    userId: number;
    amount: number;
    transactionType: string;
    timestamp: number;
    status: string;
  }

const producer: Producer = kafka.producer(); // Typed Kafka producer

// Function to connect the producer
const connectProducer = async (): Promise<void> => {
  try {
    await producer.connect();
    console.log('Kafka producer connected');
  } catch (error) {
    console.error('Error connecting Kafka producer:', error);
  }
};

// Function to send transaction event
const sendTransactionEvent = async (transactionData: TransactionData): Promise<void> => {
  try {
    await producer.send({
      topic: 'transaction',
      messages: [
        {
          key: String(transactionData.userId),
          value: JSON.stringify(transactionData),
        },
      ] as Message[],
    });

    console.log(`Transaction sent to user id ${transactionData.userId}`);
  } catch (error) {
    console.error('Error sending transaction event:', error);
  }
};

export { connectProducer, sendTransactionEvent };
