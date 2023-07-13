import ITeam from './ITeam';
import { Create, Read } from './ICRUDModel';

interface ITeamModel extends Read<ITeam>, Create<ITeam> {}
export default ITeamModel;
