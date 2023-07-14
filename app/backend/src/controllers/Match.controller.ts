import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  private service: MatchService;

  constructor(service: MatchService = new MatchService()) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const { status, data } = await this.service.getAll(inProgress as string | undefined);
    return res.status(status).json(data);
  };

  finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data } = await this.service.finish(id);
    return res.status(status).json(data);
  };
}
