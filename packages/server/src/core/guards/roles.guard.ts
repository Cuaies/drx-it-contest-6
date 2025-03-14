import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants';
import { UserErrorMessages } from '../messages';

/**
 * Guard that blocks request if user not of role.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const roles = req.user.roles.map((role) => role.roleName);

    const hasRole = requiredRoles.some((requiredRole) =>
      roles.includes(requiredRole),
    );
    if (!hasRole) {
      throw new ForbiddenException(UserErrorMessages.InsufficientPermission);
    }

    return true;
  }
}
