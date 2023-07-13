import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const team = new TeamController();

const router = Router();

router.get('/', (req, res) => team.getAllTeams(req, res));

router.get('/:id', (req, res) => team.getTeamById(req, res));

export default router;
