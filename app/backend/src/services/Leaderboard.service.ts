import TeamStatus from '../utils/TeamStatus';
import MatchModel from '../models/Match.model';
import ToAnalize from '../Interfaces/ToAnalize';
import { ServiceReturn } from '../Interfaces/ServiceReturn';

export default class LeaderboardService {
  private model: MatchModel;
  private static internalServerError = {
    status: 500,
    data: { message: 'Internal server error' },
  };

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

  private static sortLeaderboard = (board: TeamStatus[]): TeamStatus[] => board.sort((a, b) => {
    const valueA = (
      (a.totalPoints * 10) + (a.totalVictories * 3) + (a.goalsBalance * 2) + a.goalsFavor);
    const valueB = (
      (b.totalPoints * 10) + (b.totalVictories * 3) + (b.goalsBalance * 2) + b.goalsFavor
    );
    return valueB - valueA;
  });

  leaderboardHome = async (): Promise<ServiceReturn<TeamStatus[]>> => {
    try {
      const matches = await this.model.getAll('false') as ToAnalize[];
      const teamsStatus = LeaderboardService.getTeamsStatus(matches, 'home');
      return { status: 200, data: LeaderboardService.sortLeaderboard(teamsStatus) };
    } catch (error) {
      return LeaderboardService.internalServerError as ServiceReturn<TeamStatus[]>;
    }
  };

  leaderboardAway = async (): Promise<ServiceReturn<TeamStatus[]>> => {
    try {
      const matches = await this.model.getAll('false') as ToAnalize[];
      const teamsStatus = LeaderboardService.getTeamsStatus(matches, 'away');
      return { status: 200, data: LeaderboardService.sortLeaderboard(teamsStatus) };
    } catch (error) {
      return LeaderboardService.internalServerError as ServiceReturn<TeamStatus[]>;
    }
  };
}
