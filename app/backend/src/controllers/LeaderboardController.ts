import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getStats(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getStats();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getHomeStats(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getHomeStats();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAwayStats(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getAwayStats();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
