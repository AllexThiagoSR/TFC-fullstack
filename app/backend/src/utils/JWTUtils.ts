import * as jwt from 'jsonwebtoken';
import Payload from '../Interfaces/Payload';
import IAuthentication from '../Interfaces/IAuthentication';

export default class JWTUtils implements IAuthentication<Payload> {
  private secret = process.env.JWT_SECRET || '';
  private config: jwt.SignOptions;

  constructor(config: jwt.SignOptions = { expiresIn: '7d' }) {
    this.config = config;
  }

  createToken(payload: Payload): string {
    const token: string = jwt.sign(payload, this.secret, this.config);
    return token;
  }

  verify(token: string): Payload {
    const payload: Payload = jwt.verify(token, this.secret) as Payload;
    return payload;
  }
}
