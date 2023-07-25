import SequelizeUser from '../database/models/SequelizeUser';
import { IUsers } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUsers[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, password, email }) => (
      { id, username, role, password, email }
    ));
  }

  async findById(id: IUsers['id']): Promise<IUsers | null> {
    const dbData = await this.model.findByPk(id);
    return !dbData ? null : dbData;
  }

  async findByEmail(email: IUsers['email']): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }
}
