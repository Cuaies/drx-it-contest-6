import { AuthGuard } from '@nestjs/passport';
import { JWT_AT } from '../constants';

/**
 * Guard care se ocupa de verificarea tokenului JWT pentru autentificare.
 */
export class JwtAtGuard extends AuthGuard(JWT_AT) {
  constructor() {
    super();
  }
}
