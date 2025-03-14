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
  Products: {
    Base: '/products',
    GET: '',
    POST: '',
    Product: {
      GET: `:${Params.ProductId}`,
      PATCH: `:${Params.ProductId}`,
      DELETE: `:${Params.ProductId}`,
    },
  },
  Materials: {
    Base: '/materials',
    GET: '',
    POST: '',
    Material: {
      GET: `:${Params.MaterialId}`,
      DELETE: `:${Params.MaterialId}`,
    },
  },
  Boms: {
    Base: '/boms',
    GET: '',
    POST: '',
    Bom: {
      GET: `:${Params.BomId}`,
      DELETE: `:${Params.BomId}`,
      MATERIALS: {
        GET: `:${Params.BomId}/materials`,
        POST: `:${Params.BomId}/materials`,
      },
    },
  },
} as const;
