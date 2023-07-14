import { NextFunction, Request, Response } from 'express';
import LoginData from '../Interfaces/LoginData';

export default class ValidateLogin {
  private static emailIsValid = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  private static passwordIsValid = (password: string) => (
    password.length >= 6
  );

  public static validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginData = req.body;
    if (email && password) { return next(); }
    return res.status(400).json({ message: 'All fields must be filled' });
  };

  public static validateFields = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginData = req.body;
    if (this.emailIsValid(email) && this.passwordIsValid(password)) return next();
    return res.status(401).json({ message: 'Invalid email or password' });
  };
}
