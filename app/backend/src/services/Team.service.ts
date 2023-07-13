import { ServiceReturn } from '../Interfaces/ServiceReturn';
import TeamModel from '../models/Team.model';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  private model: TeamModel;
  constructor(model: TeamModel = new TeamModel()) {
    this.model = model;
  }

  getAll = async (): Promise<ServiceReturn<ITeam[]>> => {
    const data = await this.model.getAll();
    return { status: 200, data };
  };
}
