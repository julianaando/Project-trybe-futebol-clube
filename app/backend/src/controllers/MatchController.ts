import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const statusProgress = inProgress ? inProgress === 'true' : undefined;

    const { status, data } = await this.matchService.getAllMatches(statusProgress);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getMatchById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.getMatchById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const newMatch = req.body;
    const { status, data } = await this.matchService.createMatch(newMatch);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await
    this.matchService.updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
