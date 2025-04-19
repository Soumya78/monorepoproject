const {PrismaClient} = require("/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma")
const prisma = new PrismaClient();  

const generateotp = ()=>Math.floor(100000 + Math.random() * 900000).toString();

const handleotpgeneration = async function(req,res,next){
    console.log(req.body)
    const {phone} = req.body;
    if(!phone){
        console.log("Phone number not found");
        return res.status(400).json({error:"Phone number not found"});
    }
    const otp = generateotp();
   const expires = new Date(Date.now() + 5 * 60 * 1000);  // OTP valid for 10 minutes 
   try{
      await prisma.oTPVerification.upsert({
        where: { phone },
        update: {  otp, expiresAt:expires },
        create: {  phone, otp, expiresAt: expires }
       
      });
      req.otp = otp 
      next();
   }catch(err){
       console.log(err);
       return res.status(500).json({error:"Internal server error"});
   }
                              
} 
module.exports = {handleotpgeneration};