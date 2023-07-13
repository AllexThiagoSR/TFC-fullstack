import { ServiceReturn } from '../Interfaces/ServiceReturn';
import TeamModel from '../models/Team.model';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  private model: TeamModel;
  private internalServerError = { status: 500, data: { message: 'Internal server error' } };
  private notFoundError = { status: 404, data: { message: 'Team not found' } };

  constructor(model: TeamModel = new TeamModel()) {
    this.model = model;
  }

  getAll = async (): Promise<ServiceReturn<ITeam[]>> => {
    try {
      const data = await this.model.getAll();
      return { status: 200, data };
    } catch (error) {
      return this.internalServerError as ServiceReturn<ITeam[]>;
    }
  };

  getById = async (id:string | number): Promise<ServiceReturn<ITeam | null>> => {
    try {
      const data = await this.model.getById(id);
      if (!data) return this.notFoundError as ServiceReturn<null>;
      return { status: 200, data };
    } catch (error) {
      return this.internalServerError as ServiceReturn<ITeam>;
    }
  };
}
