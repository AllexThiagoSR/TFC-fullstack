import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import ValidateToken from '../middlewares/ValidateToken';

const router = Router();
const controller = new MatchController();
const tokenValidator = new ValidateToken();

router.get('/', controller.getAll);

router.patch('/:id/finish', tokenValidator.validate, controller.finish);

export default router;
