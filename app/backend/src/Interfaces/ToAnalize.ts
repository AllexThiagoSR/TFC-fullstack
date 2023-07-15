import IMatch from './IMatch';
import ITeam from './ITeam';

export default interface ToAnalize extends IMatch {
  homeTeam: ITeam;
  awayTeam: ITeam;
}
