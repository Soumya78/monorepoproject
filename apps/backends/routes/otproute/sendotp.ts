import { Router, Request, Response } from 'express';
import {handleOtpGeneration}  from '../../config/middleware/otpmiddleware/otpmiddleware.ts';

const router: Router = Router();
interface OTPRequestBody {
  phone: string;
}
interface CustomRequest extends Request<{}, {}, OTPRequestBody> {
    otp?: string;
  }

router.post('/', handleOtpGeneration, async (req: CustomRequest, res: Response) => {
  console.log(`OTP for ${req.body.phone}: ${req.otp}`);

  res.status(200).json({ message: 'OTP sent successfully' });
});

export default router;
