import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboards from '../Interfaces/leaderboard/ILeaderboards';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import ILeaderboardData from '../Interfaces/leaderboard/ILeaderboardData';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamsModel from '../models/TeamModel';
import CreateLeaderboard from '../utils/createLeaderboard';
import LeaderboardSides from '../utils/leaderboardSides';

export default class LeaderboardService {
  private _leaderboard: ILeaderboards[] = [];
  private _data: ILeaderboardData = { matches: [], teams: [] };

  constructor(
    private leaderboardModel: Omit<ILeaderboardModel, 'findById' | 'findAll'>
    = new LeaderboardModel(),
  ) {}

  async getStats(): Promise<ServiceResponse<ILeaderboards[]>> {
    this._leaderboard = await this.getLeaderboard();
    return { status: 'SUCCESSFUL', data: this.sortTeams() };
  }

  async getHomeStats(): Promise<ServiceResponse<ILeaderboards[]>> {
    this._leaderboard = await this.getHomeLeaderboard();
    return { status: 'SUCCESSFUL', data: this.sortTeams() };
  }

  async getAwayStats(): Promise<ServiceResponse<ILeaderboards[]>> {
    this._leaderboard = await this.getAwayLeaderboard();
    return { status: 'SUCCESSFUL', data: this.sortTeams() };
  }

  private async getLeaderboard(): Promise<ILeaderboards[]> {
    const { matches, teams } = await this.getData();
    const leaderboard = new CreateLeaderboard(matches);
    return leaderboard.calculateTeamStats(teams);
  }

  private async getHomeLeaderboard(): Promise<ILeaderboards[]> {
    const { matches, teams } = await this.getData();
    return teams.map((team) => {
      const homeStats = matches.filter((match) => team.id === match.homeTeamId);
      const homeLeaderboard = new LeaderboardSides(homeStats, team.id, 'home');
      return {
        name: team.teamName,
        totalPoints: homeLeaderboard.totalPoints,
        totalGames: homeStats.length,
        totalVictories: homeLeaderboard.totalVictories,
        totalDraws: homeLeaderboard.totalDraws,
        totalLosses: homeLeaderboard.totalLosses,
        goalsFavor: homeLeaderboard.goalsFavor,
        goalsOwn: homeLeaderboard.goalsOwn,
        goalsBalance: homeLeaderboard.goalsBalance,
        efficiency: homeLeaderboard.efficiency,
      };
    });
  }

  private async getAwayLeaderboard(): Promise<ILeaderboards[]> {
    const { matches, teams } = await this.getData();
    return teams.map((team) => {
      const awayStats = matches.filter((match) => team.id === match.awayTeamId);
      const awayLeaderboard = new LeaderboardSides(awayStats, team.id, 'away');
      return {
        name: team.teamName,
        totalPoints: awayLeaderboard.totalPoints,
        totalGames: awayStats.length,
        totalVictories: awayLeaderboard.totalVictories,
        totalDraws: awayLeaderboard.totalDraws,
        totalLosses: awayLeaderboard.totalLosses,
        goalsFavor: awayLeaderboard.goalsFavor,
        goalsOwn: awayLeaderboard.goalsOwn,
        goalsBalance: awayLeaderboard.goalsBalance,
        efficiency: awayLeaderboard.efficiency,
      };
    });
  }

  private async getData(): Promise<ILeaderboardData> {
    this._data = {
      matches: await this.leaderboardModel.getMatchResults(),
      teams: await new TeamsModel().findAll(),
    };
    return this._data;
  }

  private sortTeams(): ILeaderboards[] {
    const params: (keyof ILeaderboards)[] = [
      'totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor'];

    return this._leaderboard.sort((a, b) => {
      const sorted = params.find((param) => a[param] !== b[param]) as keyof ILeaderboards;
      return +b[sorted] - +a[sorted];
    });
  }
}
