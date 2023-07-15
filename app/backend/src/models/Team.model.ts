import ITeam from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamModel from '../Interfaces/ITeamModel';
import NewEntity from '../Interfaces/NewEntity';

export default class TeamModel implements ITeamModel {
  private teamModel = SequelizeTeam;

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: string | number): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }

  public async create(data: NewEntity<ITeam>): Promise<ITeam> {
    const newTeam = await this.teamModel.create(data);
    return newTeam;
  }

  public async getByFieldFilter(field: string, value: unknown): Promise<ITeam[]> {
    const foundTeams = await this.teamModel.findAll({ where: { [field]: value } });
    return foundTeams;
  }
}
