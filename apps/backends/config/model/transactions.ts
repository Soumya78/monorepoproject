import mongoose, { Document, Schema, Model, model } from 'mongoose';


// Define the interface for the transaction document
export interface Transaction extends Document {
  transactionId: string;
  userId:string;
  amount: number;
  status: string;
  timestamp: Date;
  fromupid: string;
  toupiid: string;
  currency: string;
}

// Create the transaction schema
const transactionSchema: Schema<Transaction> = new Schema({
  transactionId: { type: String, unique: true, required: true },
  userId: { type: String, ref:"users",required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'PENDING' },
  timestamp: { type: Date, default: new Date()},
  fromupid: { type: String, required: true },
  toupiid: { type: String, required: true },
  currency: { type: String, required: true },
});

// Create the model using the schema and interface
const Transaction: Model<Transaction> = model<Transaction>('Transaction', transactionSchema);

export default Transaction;
