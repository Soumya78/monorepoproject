import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);

const otpservice = async (phone: string, otp: string): Promise<boolean> => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER as string,
      to: phone.startsWith('+') ? phone : `+91${phone}`,
    });

    console.log(message.sid);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { otpservice };
