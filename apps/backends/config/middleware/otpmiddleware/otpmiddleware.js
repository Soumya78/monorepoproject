"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOtpGeneration = void 0;
const prisma_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/generated/prisma");
const otpservice_1 = require("/Users/soumya/Documents/my-monorepo/apps/backends/services/otpservice");
// Type for the OTP generation function (returns a string)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
// Prisma Client
const prisma = new prisma_1.PrismaClient();
// OTP generation handler
const handleOtpGeneration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield prisma.oTPVerification.upsert({
            where: { phone },
            update: { otp, expiresAt: expires },
            create: { phone, otp, expiresAt: expires },
        });
        // Attach OTP to the request object (if needed)
        req.otp = otp;
        // Send OTP using the otpservice
        yield (0, otpservice_1.otpservice)(phone, otp);
        console.log('OTP sent successfully');
        return next(); // Proceed to the next middleware or route handler
    }
    catch (err) {
        console.log('Error occurred while generating OTP:', err);
        res.status(500).json({ error: 'Internal server error' }); // Return error response and stop execution
    }
});
exports.handleOtpGeneration = handleOtpGeneration;
