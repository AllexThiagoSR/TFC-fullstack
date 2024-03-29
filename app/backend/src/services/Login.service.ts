import { ServiceReturn } from '../Interfaces/ServiceReturn';
import LoginData from '../Interfaces/LoginData';
import UserModel from '../models/User.model';
import JWTUtils from '../utils/JWTUtils';
import BcryptUtils from '../utils/BcryptUtils';

const jwt = new JWTUtils();

export default class LoginService {
  private model: UserModel;
  constructor(model: UserModel = new UserModel()) {
    this.model = model;
  }

  login = async (
    { email, password }: LoginData,
  ): Promise<ServiceReturn<{ token: string }>> => {
    const user = await this.model.getByEmail(email);
    if (!user || !BcryptUtils.compare(password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const { id, username, role } = user;
    const token = jwt.createToken({ id, username, role });
    return { status: 200, data: { token } };
  };
}
