import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private userModel = SequelizeUser;

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
}
