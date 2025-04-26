import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import model from '/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.ts';
import {checkUserExists} from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/registermiddleware/checkuserexists.ts';
import genratetoken from '../../config/middleware/registermiddleware/generatetoken.ts';
import hashspassword from '/Users/soumya/Documents/my-monorepo/apps/backends/utils/hashpassword.ts';
import saveusertodb from '../../config/middleware/registermiddleware/saveusertodb.ts';
import validateregisterfield from '../../config/middleware/registermiddleware/validateregisterfields.ts';
import loginusermiddleware from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware.ts';
import sendusertoqueue from '../../config/middleware/sendusertoqueue/sendusertoqueue.ts';

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
