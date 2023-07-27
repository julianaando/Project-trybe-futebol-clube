import IMatches from '../Interfaces/matches/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';

export default class LeaderboardModel implements Omit<ILeaderboardModel, 'findById' | 'findAll'> {
  private matchModel = SequelizeMatch;

  public async getMatchResults(): Promise<IMatches[]> {
    return this.matchModel.findAll({
      where: { inProgress: false },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }
}
