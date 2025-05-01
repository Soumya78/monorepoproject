import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import model from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.ts'; 
import genereateupiid from '../../../controllers/generateupiidcontroller'; // Update with actual path

// Type for the user creation request body
interface UserRequestBody {
  userid:string,
  emailid: string;
  password: string;
  secret: string;
  upiid: string;
}

// Middleware function to create a new user
const createUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {  emailid, password, secret } = req.body;
   

const upiid = await genereateupiid(emailid)

    // Create a new user object with a generated UUID if 'userid' is not provided
    const newUser = new model({
      userid: uuidv4(), // Generate a new UUID for the user ID
      emailid,
      password,
      secret,
      upiid,
    
    });

    // Save the new user to the database
    const saveduser = await newUser.save();
    
    // Attach the saved user to the request object for downstream middlewares or handlers
    interface CustomRequest extends Request {
      saveusertodb?: Document ; 
    }

    // Respond with the created user information
    res.status(201).json({ message: 'User created successfully' ,userid:saveduser.userid,upiid:saveduser.upiid });
  } catch (err) {
    // Handle errors during user creation
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default createUser;
