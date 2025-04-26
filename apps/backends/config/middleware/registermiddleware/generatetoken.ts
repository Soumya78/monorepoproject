import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware function to generate JWT token
const generateToken = (req: Request, res: Response, next: NextFunction): void => {
  const { emailid, username } = req.body;

  try {
    // Define the payload for the token
    const payload = {
      emailid,
      username,
      createdAt: new Date().toISOString(),
    };

    // Sign the token with JWT_SECRET_KEY and set it to expire in 30 days
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '30d',
    });

    // Store the token in the request body for use in the next middleware
    req.body.secret = token;

    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('Token generation error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default generateToken;
