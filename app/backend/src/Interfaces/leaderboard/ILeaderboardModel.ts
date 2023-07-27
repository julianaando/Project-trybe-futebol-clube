import ILeaderboards from './ILeaderboards';
import { ICRUDModelReader } from '../ICRUDModel';
import IMatches from '../matches/IMatches';

export interface ILeaderboardModel extends ICRUDModelReader<ILeaderboards> {
  getMatchResults(): Promise<IMatches[]>
}
