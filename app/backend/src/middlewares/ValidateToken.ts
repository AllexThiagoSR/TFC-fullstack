import { NextFunction, Request, Response } from 'express';
import JWTUtils from '../utils/JWTUtils';
import IAuthentication from '../Interfaces/IAuthentication';
import Payload from '../Interfaces/Payload';

export default class ValidateToken {
  private validator: IAuthentication<Payload>;

  constructor(validator: IAuthentication<Payload> = new JWTUtils()) {
    this.validator = validator;
  }

  private static getTokenOnly = (bearerToken: string) => {
    const splitted = bearerToken.split(' ');
    return splitted[splitted.length - 1];
  };

  public validate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('authorization');
      if (!token) return res.status(401).json({ message: 'Token not found' });
      const payload = this.validator.verify(ValidateToken.getTokenOnly(token));
      res.locals.user = payload;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
