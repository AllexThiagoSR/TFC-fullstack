import ToAnalize from '../Interfaces/ToAnalize';

export default class TeamStatus {
  public name;
  public totalPoints = 0;
  public totalGames = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = 0;

  public mergeStatus = (statusToMerge: TeamStatus) => {
    if (this.name === statusToMerge.name) {
      this.totalPoints += statusToMerge.totalPoints;
      this.totalGames += statusToMerge.totalGames;
      this.totalVictories += statusToMerge.totalVictories;
      this.totalDraws += statusToMerge.totalDraws;
      this.totalLosses += statusToMerge.totalLosses;
      this.goalsFavor += statusToMerge.goalsFavor;
      this.goalsOwn += statusToMerge.goalsOwn;
      this.goalsBalance += statusToMerge.goalsBalance;
      this.calculateEfficiency();
    }
    return this;
  };

  constructor(teamToAnalize: 'home' | 'away', firstMatch: ToAnalize) {
    this.name = firstMatch[`${teamToAnalize}Team`].teamName;
    this.updateStatus(teamToAnalize, firstMatch);
  }

  public updateStatus = (teamToAnalize: 'home' | 'away', match: ToAnalize) => {
    const rivalTeam = teamToAnalize === 'home' ? 'away' : 'home';
    this.totalGames += 1;
    this.goalsFavor += match[`${teamToAnalize}TeamGoals`];
    this.goalsOwn += match[`${rivalTeam}TeamGoals`];
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.teamWin(teamToAnalize, match);
    this.calculatePoints();
    this.calculateEfficiency();
  };

  private teamWin = (teamToAnalize: 'home' | 'away', match: ToAnalize) => {
    const rivalTeam = teamToAnalize === 'home' ? 'away' : 'home';
    const teamGoals = match[`${teamToAnalize}TeamGoals`];
    const rivalGoals = match[`${rivalTeam}TeamGoals`];
    if (rivalGoals > teamGoals) this.totalLosses += 1;
    else if (teamGoals > rivalGoals) this.totalVictories += 1;
    else if (teamGoals === rivalGoals) this.totalDraws += 1;
  };

  private calculatePoints = () => {
    this.totalPoints = this.totalVictories * 3;
    this.totalPoints += this.totalDraws;
  };

  private calculateEfficiency = () => {
    const efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
    this.efficiency = parseFloat(efficiency);
  };
}
