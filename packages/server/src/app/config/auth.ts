import { randomBytes } from 'crypto';

export const authConfiguration = () => ({
  auth: {
    jwt_secret: randomBytes(32).toString('hex'),
    jwt_expiration: '1h',
    jwt_at: {
      httpOnly: true,
      secure: false, // TODO: enable in prod
      sameSite: 'none',
      maxAge: 1 * 60 * 60 * 1000,
    },
  },
});
