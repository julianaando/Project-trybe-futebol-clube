import IMatches from './IMatches';
import { ICRUDModelReader } from '../ICRUDModel';

export interface IMatchModel extends ICRUDModelReader<IMatches> {
  findByProgress(inProgress: boolean): Promise<IMatches[]>;
}
