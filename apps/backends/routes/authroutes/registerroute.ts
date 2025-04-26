import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import model from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js';
import {checkUserExists} from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/registermiddleware/checkuserexists';
import genratetoken from '../../config/middleware/registermiddleware/generatetoken';
import hashspassword from '/Users/soumya/Documents/my-monorepo/apps/backends/utils/hashpassword';
import saveusertodb from '../../config/middleware/registermiddleware/saveusertodb';
import validateregisterfield from '../../config/middleware/registermiddleware/validateregisterfields';
import loginusermiddleware from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware';
import sendusertoqueue from '../../config/middleware/sendusertoqueue/sendusertoqueue';

dotenv.config();

const router = Router();

router.post(
  '/',
  checkUserExists,
  genratetoken,
  hashspassword,
  saveusertodb,
  sendusertoqueue,
  validateregisterfield,
  (req: Request, res: Response) => {
    console.log('Checking registration process');
    // You can handle response or additional logic if needed
    res.status(200).send('Registration Successful'); // Modify response as needed
  }
);

export default router;
