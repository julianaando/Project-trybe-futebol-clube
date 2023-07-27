import IMatches from '../matches/IMatches';
import ITeams from '../teams/ITeams';

export default interface ILeaderboardData {
  matches: IMatches[],
  teams: ITeams[],
}
