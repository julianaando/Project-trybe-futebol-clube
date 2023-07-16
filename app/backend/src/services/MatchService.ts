import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: Omit<IMatchModel, 'findById'> = new MatchModel(),
  ) { }

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    return inProgress === undefined
      ? { status: 'SUCCESSFUL', data: await this.matchModel.findAll() }
      : { status: 'SUCCESSFUL', data: await this.matchModel.findByProgress(inProgress) };
  }
}
