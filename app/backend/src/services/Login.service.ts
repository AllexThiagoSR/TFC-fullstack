import { ServiceReturn } from '../Interfaces/ServiceReturn';
import LoginData from '../Interfaces/LoginData';
import UserModel from '../models/User.model';

export default class LoginService {
  private model: UserModel;
  constructor(model: UserModel = new UserModel()) {
    this.model = model;
  }

  login = async (
    { email, password }: LoginData,
  ): Promise<ServiceReturn<{ token: string }>> => {
    const user = await this.model.getByEmail(email);
    if (!user || user.password !== password) {
      return { status: 401, data: { message: 'Incorrect email or password' } };
    }
    return { status: 200, data: { token: '123456e' } };
  };
}
