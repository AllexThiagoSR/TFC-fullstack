import { Create, Read, Update } from './ICRUDModel';
import IMatch from './IMatch';

export default interface IMatchModel extends Read<IMatch>, Create<IMatch>, Update<unknown> {
  getAll(inProgress?: string): Promise<IMatch[]>;
  finish(id: string | number): Promise<void>;
}
