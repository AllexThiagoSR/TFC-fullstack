import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import ValidateLogin from '../middlewares/ValidateLogin';
import ValidateToken from '../middlewares/ValidateToken';

const controller = new LoginController();
const tokenValidator = new ValidateToken();
const router = Router();

router.post('/', ValidateLogin.validateLogin, ValidateLogin.validateFields, controller.login);
router.get('/role', tokenValidator.validate, controller.getRole);

export default router;
