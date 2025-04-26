"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to generate JWT token
const generateToken = (req, res, next) => {
    const { emailid, username } = req.body;
    try {
        // Define the payload for the token
        const payload = {
            emailid,
            username,
            createdAt: new Date().toISOString(),
        };
        // Sign the token with JWT_SECRET_KEY and set it to expire in 30 days
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });
        // Store the token in the request body for use in the next middleware
        req.body.secret = token;
        next(); // Proceed to the next middleware
    }
    catch (err) {
        console.error('Token generation error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.default = generateToken;
