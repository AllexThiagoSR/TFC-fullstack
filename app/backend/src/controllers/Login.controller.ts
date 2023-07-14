import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  private service: LoginService;
  constructor(service: LoginService = new LoginService()) {
    this.service = service;
  }

  login = async (req: Request, res: Response) => {
    const { status, data } = await this.service.login(req.body);
    return res.status(status).json(data);
  };

  getRole = async (_req: Request, res: Response) => res
    .status(200).json({ role: res.locals.user.role });
}
