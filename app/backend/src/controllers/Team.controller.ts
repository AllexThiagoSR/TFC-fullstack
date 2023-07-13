import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  private service: TeamService;

  constructor(service: TeamService = new TeamService()) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const { status, data } = await this.service.getAll();
    return res.status(status).json(data);
  };
}
