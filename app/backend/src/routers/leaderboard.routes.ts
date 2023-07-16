import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const controller = new LeaderboardController();
const router = Router();

router.get('/', controller.leaderboard);

router.get('/home', controller.home);

router.get('/away', controller.away);

export default router;
