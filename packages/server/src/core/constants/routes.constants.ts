import { Params } from '../../ts/enums';

export const Routes = {
  Users: {
    Base: '/users',
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
    Roles: {
      GET: `:${Params.UserId}/roles`,
      POST: `:${Params.UserId}/roles/:${Params.RoleId}`,
    },
  },
  Roles: {
    Base: '/roles',
    GET: '',
    Users: {
      GET: `:${Params.RoleId}/users`,
    },
  },
  Stages: {
    Base: '/stages',
    GET: '',
  },
} as const;
