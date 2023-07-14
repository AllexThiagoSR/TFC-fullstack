import NewEntity from '../Interfaces/NewEntity';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatchModel from '../Interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  public matchModel = SequelizeMatch;

  async getAll(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll(
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            foreignKey: 'homeTeamId',
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            foreignKey: 'awayTeamId',
          },
        ],
      },
    );
    return matches;
  }

  async getById(id: string | number): Promise<IMatch | null> {
    const match = await this.matchModel.findByPk(
      id,
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            foreignKey: 'homeTeamId',
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            foreignKey: 'awayTeamId',
          },
        ],
      },
    );
    return match;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const match = await this.matchModel.create(data);
    return match;
  }
}
