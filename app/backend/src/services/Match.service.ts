import NewEntity from '../Interfaces/NewEntity';
import IMatch from '../Interfaces/IMatch';
import { ServiceReturn } from '../Interfaces/ServiceReturn';
import MatchModel from '../models/Match.model';

export default class MatchService {
  private model: MatchModel;
  private static internalServerError = {
    status: 500,
    data: { message: 'Internal server error' },
  };

  private static notFoundError = {
    status: 404,
    data: { message: 'Match not found' },
  };

  constructor(model: MatchModel = new MatchModel()) {
    this.model = model;
  }

  getAll = async (inProgress?: string): Promise<ServiceReturn<IMatch[]>> => {
    try {
      const matches = await this.model.getAll(inProgress);
      return { status: 200, data: matches };
    } catch (error) {
      return MatchService.internalServerError as ServiceReturn<IMatch[]>;
    }
  };

  finish = async (id: string | number): Promise<ServiceReturn<{ message: 'Finished' }>> => {
    try {
      await this.model.finish(id);
      return { status: 200, data: { message: 'Finished' } };
    } catch (error) {
      return MatchService.internalServerError as ServiceReturn<{ message: 'Finished' }>;
    }
  };

  update = async (id: string | number, data: Partial<NewEntity<IMatch>>):
  Promise<ServiceReturn<{ message: 'Score updated' }>> => {
    try {
      await this.model.update(id, data);
      return { status: 200, data: { message: 'Score updated' } };
    } catch (error) {
      return MatchService.internalServerError as ServiceReturn<{ message: 'Score updated' }>;
    }
  };
}
