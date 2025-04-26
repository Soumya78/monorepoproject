import { Router, Request, Response } from 'express';
import logoutcontroller from '/Users/soumya/Documents/my-monorepo/apps/backends/controllers/logoutcontroller';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  logoutcontroller(req, res);
});

export default router;
