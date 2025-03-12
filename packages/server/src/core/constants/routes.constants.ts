import { Params } from '../../ts/enums';

export const Routes = {
  Users: {
    Base: '/auth', // TODO: fix
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
    Roles: {
      GET: `${Params.UserId}/roles`,
      POST: `${Params.UserId}/roles/${Params.RoleId}`,
    },
  },
  Roles: {
    Base: '/roles',
    GET: '',
    Users: {
      GET: `${Params.RoleId}/users`,
    },
  },
} as const;
