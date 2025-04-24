const processtransaction = async function (transactiondata) {
   try{
      await new Promise ((resolve) => setTimeout(resolve, 1000));
      const isapprovd = transactiondata.amount <= 1000;
      const status = isapprovd ? "APPROVED" : "REJECTED";
      return {
       transactionId:transactiondata.transactionId,
       status
      }
   }catch(err){
      console.log("Error in processing transaction",err);
   } 
}
module.exports = { processtransaction }