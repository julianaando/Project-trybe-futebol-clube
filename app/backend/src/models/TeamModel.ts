import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeams from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class Team implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    return team;
  }
}
