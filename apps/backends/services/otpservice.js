const twillo = require('twilio');
require('dotenv').config();

const client  = twillo(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpservice  = async function(phone,otp){
    try{
       const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone.startsWith('+') ? phone : `+91${phone}`
        });
        console.log(message.sid);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}
module.exports = {otpservice};