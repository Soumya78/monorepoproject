import { Request, Response, NextFunction } from 'express';

const validateRegistrationFields = (req: Request, res: Response, next: NextFunction): void => {
  const { username, emailid, password } = req.body;

  if (!username || !emailid || !password) {
    console.log('Missing required fields:', { username, emailid, password });
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  next();
};

export default validateRegistrationFields;
