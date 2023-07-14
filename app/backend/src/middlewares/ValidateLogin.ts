import { NextFunction, Request, Response } from 'express';
import LoginData from '../Interfaces/LoginData';

export default class ValidateLogin {
  // private static emailIsValid = (email: string): boolean => {
  //   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const emailIsFilled = email !== null && email !== undefined;
  //   return emailIsFilled && regex.test(email);
  // };

  private static emailWasSent = (email: string): boolean => (
    email !== null && email !== undefined
  );

  private static passwordWasSent = (password: string) => (
    password !== null && password !== undefined
  );

  public static validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginData = req.body;
    if (this.emailWasSent(email) && this.passwordWasSent(password)) { return next(); }
    return res.status(400).json({ message: 'All fields must be filled' });
  };
}
