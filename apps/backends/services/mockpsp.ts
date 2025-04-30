import mongoose from "mongoose";
import User from "../config/model/users";

interface TransactionData {
  fromupid: string;
  toupiid: string;
  currency: string;
  transactionId: string;
  amount: number;
  status: string;

}

interface ProcessedTransaction {
  transactionId: string;
  status: string;
}

const processtransaction = async function (transactiondata: TransactionData): Promise<ProcessedTransaction | undefined> {
  try {

    const fromUser = await User.findOne({ upiid: transactiondata.fromupid });
    const toUser = await User.findOne({ upiid: transactiondata.toupiid });

    if (!fromUser || !toUser) {
      console.log('❌ Invalid UPI IDs involved');
      return {
        transactionId: transactiondata.transactionId,
        status: 'REJECTED',
      };
    }



    await new Promise((resolve) => setTimeout(resolve, 300));
    // Simulating processing time
    const isapproved = Math.random() > 0.7;
    const status = isapproved ? 'APPROVED' : 'REJECTED';
    return {
      transactionId: transactiondata.transactionId,
      status: status,
    }
  } catch (err) {
    console.log("Error in processing transaction", err);
    // You can optionally throw an error if you want the caller to handle it.
  }
};

export { processtransaction };
