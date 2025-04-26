import { PrismaClient } from '/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma/client.js';
import {otpservice}  from '/Users/soumya/Documents/my-monorepo/apps/backends/services/otpservice.ts';
import { Request, Response, NextFunction } from 'express';

// Type for the OTP request body
interface OTPRequestBody {
  phone: string;
}
interface CustomRequest extends Request<{}, {}, OTPRequestBody> {
    otp?: string;
  }

// Type for the OTP generation function (returns a string)
const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

// Prisma Client
const prisma = new PrismaClient();

// OTP generation handler
const handleOtpGeneration = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.body);

  const { phone } = req.body;

  // Ensure phone number is provided
  if (!phone) {
    console.log('Phone number not found');
     res.status(400).json({ error: 'Phone number not found' }); // Return response and stop execution here
  }

  const otp = generateOtp();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

  try {
    // Upsert OTP verification data in the database
    await prisma.oTPVerification.upsert({
      where: { phone },
      update: { otp, expiresAt: expires },
      create: { phone, otp, expiresAt: expires },
    });

    // Attach OTP to the request object (if needed)
    req.otp= otp;

    // Send OTP using the otpservice
    await otpservice(phone, otp);

    console.log('OTP sent successfully');
    return next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.log('Error occurred while generating OTP:', err);
    res.status(500).json({ error: 'Internal server error' }); // Return error response and stop execution
  }
};

export { handleOtpGeneration };
