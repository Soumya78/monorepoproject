import kafkajs  from 'kafkajs'; 
const{Kafka} = kafkajs;
import type {  Consumer, KafkaMessage } from 'kafkajs';
import mongoose from 'mongoose';
import {processtransaction }  from '../../services/mockpsp.ts';
import Transaction from '../../config/model/transactions.ts';
import { getIoInstance } from '../../controllers/realtime/websocket/realtimeupi.ts';

// Kafka consumer types
const kafka = new Kafka({
  clientId: 'transaction-status-client',
  brokers: ['localhost:9092'],  // Update with your Kafka broker address
});

const consumer: Consumer = kafka.consumer({ groupId: 'transaction-status-group' }); // Typed Kafka consumer

// Interface for the status update message from Kafka
interface ITransactionStatusUpdate {
  transactionId: string;
  status: string;
}

// Connect to Kafka and consume messages
const connectStatusConsumer = async (): Promise<void> => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'transaction-status', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }: { topic: string; partition: number; message: KafkaMessage }) => {
        const statusUpdate: ITransactionStatusUpdate = JSON.parse(message.value?.toString() || '{}');

        try {
          // Update the transaction status in the database
          const updatedTransaction = await Transaction.findOneAndUpdate(
            { transactionId: statusUpdate.transactionId },
            { $set: { status: statusUpdate.status } },
            { new: true }
          );
          const io = getIoInstance();
          if(io && updatedTransaction){
            io.emit('transaction-status-update',{transactionid:updatedTransaction.transactionId,
              transactionstatus:updatedTransaction.status,
            })
            console.log('Transaction status updated and emitted')
          }

          if (updatedTransaction) {
            console.log('✅ Transaction updated in DB:', updatedTransaction);
          } else {
            console.log('No transaction found to update for transactionId:', statusUpdate.transactionId);
          }
        } catch (err) {
          console.error('Error in updating transaction status:', err);
        }
      },
    });
  } catch (err) {
    console.error('Error in connecting to Kafka or running consumer:', err);
  }
};

export { connectStatusConsumer };
