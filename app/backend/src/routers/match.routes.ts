import { Router } from 'express';
import MatchController from '../controllers/Match.controller';
import ValidateToken from '../middlewares/ValidateToken';

const router = Router();
const controller = new MatchController();
const tokenValidator = new ValidateToken();

router.get('/', controller.getAll);

router.patch('/:id', tokenValidator.validate, controller.update);

router.patch('/:id/finish', tokenValidator.validate, controller.finish);

router.post('/', tokenValidator.validate, controller.create);

export default router;
