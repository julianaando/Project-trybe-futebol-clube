import { Secret, sign, verify } from 'jsonwebtoken';
import { Token } from '../Interfaces';

export default class JWT {
  private static jwtSecret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  static createToken(payload: Token): string {
    return sign(payload, JWT.jwtSecret);
  }

  static verifyToken(token: string) {
    return verify(token, JWT.jwtSecret);
  }
}
