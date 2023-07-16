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
}
