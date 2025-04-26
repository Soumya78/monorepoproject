import { Request, Response, NextFunction, Router } from 'express';
import loginusermiddleware from '/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware';

const router = Router();

router.post('/', loginusermiddleware);

export default router;
