import { Router } from 'express';
import teamRouter from './TeamRouter';

const router = Router();

router.use('/teams', teamRouter);

export default router;
