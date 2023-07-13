import ITeam from '../Interfaces/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeamModel from '../Interfaces/ITeamModel';

export default class TeamModel implements ITeamModel {
  private teamModel = SequelizeTeam;

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
