import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  private service: MatchService;

  constructor(service: MatchService = new MatchService()) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response) => {
    const { status, data } = await this.service.getAll();
    return res.status(status).json(data);
  };
}
