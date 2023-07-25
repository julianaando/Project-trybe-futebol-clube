import { Router } from 'express';
import teamRouter from './TeamRouter';
import matchRouter from './MatchRouter';
import userRouter from './UserRouter';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
