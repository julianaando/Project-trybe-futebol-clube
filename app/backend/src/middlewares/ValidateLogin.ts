import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../Interfaces/users/IUsers';

export default class ValidationLogin {
  private static passwordMinLength = 6;
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!ValidationLogin.emailRegex.test(email)
    || password.length < ValidationLogin.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
