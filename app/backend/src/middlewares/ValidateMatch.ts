import { Request, Response, NextFunction } from 'express';
import ITeams from '../Interfaces/teams/ITeams';
import TeamModel from '../models/TeamModel';

export default class ValidationMatch {
  static async validateMatch(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const teamModel = new TeamModel();
    const teams: ITeams[] = await teamModel.findAll();

    if (!teams.some((team) => team.id === homeTeamId)
    || !teams.some((team) => team.id === awayTeamId)) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
