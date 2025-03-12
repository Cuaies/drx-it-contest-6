export const Routes = {
  Users: {
    Base: '/auth', // TODO: fix
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
  },
  Roles: {
    Base: '/roles',
    GET: '',
  },
} as const;
