import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that extract currently authenticated user.
 */
export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user?.dataValues;
  },
);
