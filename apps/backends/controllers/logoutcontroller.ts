import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import redis from '../client/redisclient'; // adjust path if needed

interface DecodedToken {
  jiti: string;
  exp: number;
  [key: string]: any;  // in case you have other fields inside the JWT
}

const logoutController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const authHeader = req.headers['authorization'];
    let token: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.authtoken) {
      token = req.cookies.authtoken;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as DecodedToken;
    const jiti = decoded.jiti;

    const expiresInSeconds = decoded.exp - Math.floor(Date.now() / 1000);

    await redis.setex(`blackedlist:${jiti}`, expiresInSeconds, token);

    res.clearCookie('authtoken');
    console.log("Logged out successfully");

    return res.status(200).json({ message: 'Logged out successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default logoutController;
