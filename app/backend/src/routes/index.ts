import { Router } from 'express';
import teamRouter from './TeamRouter';
import matchRouter from './MatchRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
