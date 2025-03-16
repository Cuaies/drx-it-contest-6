import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator that extracts the currently authenticated user.
 */
export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
