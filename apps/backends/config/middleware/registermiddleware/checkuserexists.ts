import { Request, Response, NextFunction } from 'express';

import model from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.ts'; // Adjust according to your model path

// Type for the request body (emailid in this case)
interface UserRequestBody {
  emailid: string;
}

const checkUserExists = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
  const { emailid } = req.body;

  try {
    const existingUser = await model.findOne({ emailid: emailid });
    console.log('Checking for user');

    if (existingUser) {
   res.status(400).json({ message: 'User already exists' });
    }

    next(); // Proceed to the next middleware
  } catch (err) {
    console.log('Error:', err);
     res.status(500).json({ message: 'Internal server error' });
  }
};

export { checkUserExists };
