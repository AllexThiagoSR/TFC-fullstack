import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor(service = new LeaderboardService()) {
    this.service = service;
  }

  home = async (_req: Request, res: Response) => {
    const { status, data } = await this.service.leaderboardHome();
    return res.status(status).json(data);
  };

  away = async (_req:Request, res: Response) => {
    const { status, data } = await this.service.leaderboardAway();
    return res.status(status).json(data);
  };

  leaderboard = async (_req: Request, res: Response) => {
    const { status, data } = await this.service.leaderboard();
    return res.status(status).json(data);
  };
}
