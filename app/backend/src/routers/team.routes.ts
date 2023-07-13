import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const controller = new TeamController();
const router = Router();

router.get('/', controller.getAll);

export default router;
