import ILeaderboards from '../Interfaces/leaderboard/ILeaderboards';
import ITeams from '../Interfaces/teams/ITeams';
import IMatches from '../Interfaces/matches/IMatches';

type Leaderboard = {
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
};

export default class CreateLeaderboard {
  private matches: IMatches[];

  constructor(matches: IMatches[]) {
    this.matches = matches;
  }

  private calculatePoints(teamId: number, side: 'home' | 'away'): number {
    const isTeamMatch = (match: IMatches): boolean => {
      if (side === 'home') return match.homeTeamId === teamId;
      if (side === 'away') return match.awayTeamId === teamId;
      return false;
    };

    const isMatchWon = (match: IMatches): boolean => {
      if (side === 'home') return match.homeTeamGoals > match.awayTeamGoals;
      if (side === 'away') return match.awayTeamGoals > match.homeTeamGoals;
      return false;
    };

    const isMatchDrawn = (match: IMatches): boolean => match.homeTeamGoals === match.awayTeamGoals;

    return this.matches.reduce((totalPoints, match) => {
      if (isTeamMatch(match)) {
        if (isMatchWon(match)) return totalPoints + 3;
        if (isMatchDrawn(match)) return totalPoints + 1;
      }

      return totalPoints;
    }, 0);
  }

  private calculateGames(teamId: number): Leaderboard {
    const teamMatches = this.matches.filter((match) => match.homeTeamId === teamId
      || match.awayTeamId === teamId);
    const totalGames = teamMatches.length;
    const totalVictories = teamMatches.reduce((total, match) =>
      total + ((match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
    || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) ? 1 : 0), 0);
    const totalDraws = teamMatches.reduce((total, match) => total + (match.homeTeamGoals
      === match.awayTeamGoals ? 1 : 0), 0);
    const totalLosses = totalGames - totalVictories - totalDraws;

    return { totalGames, totalVictories, totalDraws, totalLosses };
  }

  private calculateGoals(teamId: number): { goalsFavor: number; goalsOwn: number; } {
    const teamMatches = this.matches.filter((match) => match.homeTeamId === teamId
    || match.awayTeamId === teamId);
    const goalsFavor = teamMatches.reduce((total, match) =>
      total + (match.homeTeamId === teamId ? match.homeTeamGoals : match.awayTeamGoals), 0);
    const goalsOwn = teamMatches.reduce((total, match) =>
      total + (match.homeTeamId === teamId ? match.awayTeamGoals : match.homeTeamGoals), 0);

    return { goalsFavor, goalsOwn };
  }

  public calculateTeamStats(teams: ITeams[]): ILeaderboards[] {
    return teams.map((team) => {
      const { totalGames, totalVictories, totalDraws, totalLosses } = this.calculateGames(team.id);
      const { goalsFavor, goalsOwn } = this.calculateGoals(team.id);
      const totalPoints = this.calculatePoints(team.id, 'home')
      + this.calculatePoints(team.id, 'away');
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: +(((totalVictories * 3 + totalDraws) / (totalGames * 3)) * 100).toFixed(2),
      };
    });
  }
}
