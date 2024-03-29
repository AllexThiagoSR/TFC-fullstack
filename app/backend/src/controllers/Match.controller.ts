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

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.service.update(id, { homeTeamGoals, awayTeamGoals });
    return res.status(status).json(data);
  };

  create = async (req: Request, res: Response) => {
    const { status, data } = await this.service.create(req.body);
    return res.status(status).json(data);
  };
}
