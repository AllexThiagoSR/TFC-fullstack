import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const controller = new LeaderboardController();
const router = Router();

router.get('/home', controller.home);

export default router;
