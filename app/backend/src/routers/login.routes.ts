import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import ValidateLogin from '../middlewares/ValidateLogin';

const controller = new LoginController();
const router = Router();

router.post('/', ValidateLogin.validateLogin, ValidateLogin.validateFields, controller.login);

export default router;
