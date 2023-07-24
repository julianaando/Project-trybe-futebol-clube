import MatchModel from '../models/MatchModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    return inProgress === undefined
      ? { status: 'SUCCESSFUL', data: await this.matchModel.findAll() }
      : { status: 'SUCCESSFUL', data: await this.matchModel.findByProgress(inProgress) };
  }

  public async createMatch(match: IMatches): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.matchModel.create(match);
    return { status: 'CREATED', data: newMatch };
  }

  public async getMatchById(id: number): Promise<ServiceResponse<IMatches | null>> {
    const matchId = await this.matchModel.findById(id);
    if (!matchId) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: matchId };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches | null>> {
    const updatedMatch = await this.matchModel.update(id, homeTeamGoals, awayTeamGoals);
    if (!updatedMatch) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<IMatches | null>> {
    const finishedMatch = await this.matchModel.finish(id);
    if (!finishedMatch) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: finishedMatch };
  }
}
