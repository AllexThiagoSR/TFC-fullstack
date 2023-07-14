import { Create, Read } from './ICRUDModel';
import IMatch from './IMatch';

export default interface IMatchModel extends Read<IMatch>, Create<IMatch> {
  getAll(inProgress?: string): Promise<IMatch[]>;
  finish(id: string | number): Promise<void>;
}
