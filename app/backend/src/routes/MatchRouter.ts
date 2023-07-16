import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const match = new MatchController();

const router = Router();

router.get('/', (req, res) => match.getAllMatches(req, res));

export default router;
