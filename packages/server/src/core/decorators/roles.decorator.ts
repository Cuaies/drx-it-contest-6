import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../../ts/enums';
import { ROLES_KEY } from '../constants';

/**
 * Decorator that allows access to supplied roles.
 */
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
