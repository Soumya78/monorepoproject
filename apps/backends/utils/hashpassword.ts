import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ message: 'Password is required' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default hashPasswordMiddleware;
