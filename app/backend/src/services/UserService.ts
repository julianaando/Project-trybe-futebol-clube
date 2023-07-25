import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUsers } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getAllUsers(): Promise<ServiceResponse<IUsers[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async getUserById(id: number): Promise<ServiceResponse<IUsers>> {
    const userId = await this.userModel.findById(id);
    if (!userId) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    return { status: 'SUCCESSFUL', data: userId };
  }

  public async login(email: string, password: string): Promise<ServiceResponse<IUsers>> {
    const user = await this.userModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }

  public async getUserRole(email: string): Promise<ServiceResponse<IUsers>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', data: user };
  }
}
