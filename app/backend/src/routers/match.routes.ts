import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const router = Router();
const controller = new MatchController();

router.get('/', controller.getAll);

export default router;
