import IMatches from '../Interfaces/matches/IMatches';

export default class LeaderboardSides {
  private filteredMatches: IMatches[];

  constructor(
    private matches: IMatches[],
    private teamId: number,
    private side: 'home' | 'away' | 'all',
  ) {
    this.filteredMatches = this.filterMatchesBySide();
  }

  private filterMatchesBySide(): IMatches[] {
    if (this.side === 'home') {
      return this.matches.filter((match) => match.homeTeamId === this.teamId);
    }
    if (this.side === 'away') {
      return this.matches.filter((match) => match.awayTeamId === this.teamId);
    }
    return this.matches.filter((match) =>
      match.homeTeamId === this.teamId
    || match.awayTeamId === this.teamId);
  }

  private countMatches(predicate: (match: IMatches) => boolean): number {
    return this.filteredMatches.reduce((total, match) => total + (predicate(match) ? 1 : 0), 0);
  }

  private calculatePoints(): number {
    return this.filteredMatches.reduce((total, match) => {
      const isMatchWon = (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
        || (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals);
      const isMatchDrawn = match.homeTeamGoals === match.awayTeamGoals;

      if (isMatchWon) {
        return total + 3;
      } if (isMatchDrawn) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  get totalPoints(): number {
    return this.calculatePoints();
  }

  get totalVictories(): number {
    return this.countMatches((match) =>
      (this.side === 'home' && match.homeTeamGoals > match.awayTeamGoals)
      || (this.side === 'away' && match.awayTeamGoals > match.homeTeamGoals));
  }

  get totalDraws(): number {
    return this.countMatches((match) => match.homeTeamGoals === match.awayTeamGoals);
  }

  get totalLosses(): number {
    return this.countMatches((match) =>
      (this.side === 'home' && match.homeTeamGoals < match.awayTeamGoals)
      || (this.side === 'away' && match.awayTeamGoals < match.homeTeamGoals));
  }

  private calculateGoals(getGoal: (match: IMatches) => number): number {
    return this.filteredMatches.reduce((total, match) => total + getGoal(match), 0);
  }

  get goalsFavor(): number {
    return this.calculateGoals((match) =>
      ((this.side === 'home') ? match.homeTeamGoals : match.awayTeamGoals));
  }

  get goalsOwn(): number {
    return this.calculateGoals((match) =>
      ((this.side === 'home') ? match.awayTeamGoals : match.homeTeamGoals));
  }

  get goalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency(): number {
    const maxPoints = this.filteredMatches.length * 3;
    const actualPoints = this.totalPoints;
    return +((100 / maxPoints) * actualPoints).toFixed(2);
  }
}
