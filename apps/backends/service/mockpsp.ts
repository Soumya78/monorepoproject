interface TransactionData {
   transactionId: string;
   userId: string;
   amount: number;
   status: string;
   timestamp: Date;
 }
 
 interface ProcessedTransaction {
   transactionId: string;
   status: string;
 }
 
 const processtransaction = async function (transactiondata: TransactionData): Promise<ProcessedTransaction | undefined> {
   try {
     // Simulating processing time
     await new Promise((resolve) => setTimeout(resolve, 1000));
 
     // Approve if the amount is less than or equal to 1000
     const isApproved = transactiondata.amount <= 1000;
     const status = isApproved ? "APPROVED" : "REJECTED";
 
     return {
       transactionId: transactiondata.transactionId,
       status,
     };
   } catch (err) {
     console.log("Error in processing transaction", err);
     // You can optionally throw an error if you want the caller to handle it.
   }
 };
 
 export { processtransaction };
 