import NewEntity from '../Interfaces/NewEntity';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatchModel from '../Interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  public matchModel = SequelizeMatch;

  private static addInprogressFilter = (inProgress?: string) => (
    !inProgress ? {} : { where: { inProgress: inProgress === 'true' } }
  );

  async getAll(inProgress?: string): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll(
      {
        ...MatchModel.addInprogressFilter(inProgress),
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

  async finish(id: string | number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const match = await this.matchModel.create({ ...data, inProgress: true });
    return match;
  }

  async update(id: string | number, data: Partial<NewEntity<IMatch>>): Promise<void> {
    await this.matchModel.update(data, { where: { id } });
  }
}
