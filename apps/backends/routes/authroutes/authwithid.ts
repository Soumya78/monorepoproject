import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.ts'; // Assuming default export for User model

const router = express.Router();

// Define the type for the User schema (based on the user schema structure)
interface IUser {
  userid: string;
  emailid: string;
  username: string;
  password: string;
  secret: string;
}

router.get("/:userid", async function (req: Request, res: Response): Promise<void>  {
  try {
    const { userid } = req.params; // Get user ID from route parameters
    console.log("User id", userid);

    // Find user in the database
    const user: IUser | null = await User.findOne({ userid });

    console.log("User found", user);

    // If no user found, send 404
    if (!user) {
       res.status(404).json({ message: "User not found" });
    } else {
      // If user found, send user data with 200 status
       res.status(200).json({ message: "User found", user });
    }
  } catch (err) {
    console.log("Error in getting user", err);
    // Catch errors and send 500 status code for internal server error
     res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
