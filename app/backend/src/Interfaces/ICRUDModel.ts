import { ID } from './index';

export interface ICRUDModelCreator<T> {
  create(match: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelInProgress<T> {
  findByProgress(inProgress: boolean): Promise<T[]>,
}

export interface ICRUDModelUpdater<T> {
  finish(id: ID): Promise<T | null>,
  update(id: ID, homeTeamGoals: ID, awayTeamGoals: ID): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>,
  ICRUDModelInProgress<T> { }
