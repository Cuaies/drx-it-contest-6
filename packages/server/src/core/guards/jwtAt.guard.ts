import { AuthGuard } from '@nestjs/passport';
import { JWT_AT } from '../constants';

/**
 * JWT Access Token validation Guard.
 */
export class JwtAtGuard extends AuthGuard(JWT_AT) {
  constructor() {
    super();
  }
}
