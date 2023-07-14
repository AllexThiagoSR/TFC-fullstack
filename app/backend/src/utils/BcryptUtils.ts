import * as bcrypt from 'bcryptjs';
import IEncryptPassword from '../Interfaces/IEncryptPassword';

export default class BcryptUtils implements IEncryptPassword {
  private static salt = 10;
  public static encrypt(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, BcryptUtils.salt);
    return hashedPassword;
  }

  public static compare(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
