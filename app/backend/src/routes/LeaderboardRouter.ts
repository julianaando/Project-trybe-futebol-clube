import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboard = new LeaderboardController();

const router = Router();

router.get('/', (req, res) => leaderboard.getStats(req, res));

router.get('/home', (req, res) => leaderboard.getHomeStats(req, res));

router.get('/away', (req, res) => leaderboard.getAwayStats(req, res));

export default router;
