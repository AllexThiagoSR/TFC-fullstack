import TeamStatus from '../utils/TeamStatus';
import MatchModel from '../models/Match.model';
import ToAnalize from '../Interfaces/ToAnalize';

export default class LeaderboardService {
  private model: MatchModel;
  constructor(model: MatchModel = new MatchModel()) {
    this.model = model;
  }

  private static getTeamsStatus = (
    matches: ToAnalize[],
    teamToAnalize: 'home' | 'away' = 'home',
  ): TeamStatus[] => {
    const teamsStatus = matches.reduce(
      (acc: TeamStatus[], match: ToAnalize) => {
        const team = acc.find((teamStatus) => (
          teamStatus.name === match[`${teamToAnalize}Team`].teamName
        ));
        if (!team) {
          return [...acc, new TeamStatus(teamToAnalize, match)];
        }
        team.updateStatus(teamToAnalize, match);
        return acc;
      },
      [],
    );
    return teamsStatus;
  };

  leaderboardHome = async () => {
    const matches = await this.model.getAll('false') as ToAnalize[];
    const teamsStatus = LeaderboardService.getTeamsStatus(matches, 'home');
    const sorted = teamsStatus.sort((a, b) => {
      const valueA = (a.totalPoints + a.totalVictories + a.goalsBalance + a.goalsFavor);
      const valueB = (b.totalPoints + b.totalVictories + b.goalsBalance + b.goalsFavor);
      return valueB - valueA;
    });
    return { status: 200, data: sorted };
  };
}
