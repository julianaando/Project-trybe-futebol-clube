import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const match = new MatchController();

const router = Router();

router.get('/', (req, res) => match.getAllMatches(req, res));
router.get('/:id', (req, res) => match.getMatchById(req, res));
router.post('/', (req, res) => match.createMatch(req, res));
router.put('/:id', (req, res) => match.updateMatch(req, res));
router.patch('/:id/finish', (req, res) => match.finishMatch(req, res));

export default router;
