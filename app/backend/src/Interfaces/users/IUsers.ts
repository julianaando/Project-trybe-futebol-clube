import { Identifiable } from '..';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUsers extends Identifiable, ILogin {
  username: string,
  role: string,
}
