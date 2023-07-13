import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService: TeamService = new TeamService(),
  ) { }

  public async getAllTeams(req: Request, res: Response): Promise<Response> {
    const response = await this.teamService.getAllTeams();
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await this.teamService.getTeamById(Number(id));
    if (response.status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json(response.data);
  }
}
