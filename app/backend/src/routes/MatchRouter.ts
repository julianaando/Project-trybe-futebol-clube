import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import ValidationToken from '../middlewares/ValidateToken';

const match = new MatchController();

const router = Router();

router.get('/', (req, res) => match.getAllMatches(req, res));

router.get('/:id', (req, res) => match.getMatchById(req, res));

router.post('/', ValidationToken.validateToken, (req, res) => match.createMatch(req, res));

router.patch('/:id', ValidationToken.validateToken, (req, res) => match.updateMatch(req, res));

router.patch('/:id/finish', ValidationToken.validateToken, (req, res) =>
  match.finishMatch(req, res));

export default router;
