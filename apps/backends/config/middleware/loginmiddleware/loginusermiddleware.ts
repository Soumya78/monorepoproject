import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express'; // Import types for req, res, next
import model from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users'; // Ensure correct import path
import cookieParser from 'cookie-parser';

const loginusermiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { emailid, password } = req.body;
    console.log(process.env.JWT_SECRET_KEY); // Make sure JWT_SECRET_KEY is set in environment variables

    try {
        const user = await model.findOne({ emailid });
  
        if (!user) {
            console.log("User not found for email:", emailid);
            res.status(400).json({ message: "User not found" });
            return;
        }

        const ismatch = await bcrypt.compare(password, user.password);
        
        if (!ismatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const jiti = uuidv4();
        const token = jwt.sign({ id: user._id, jiti }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });

        // Set cookie and return response
        res.cookie('authtoken', token, {
            httpOnly: true,
            secure: false, // In production, set to true if you're using HTTPS
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default loginusermiddleware;
