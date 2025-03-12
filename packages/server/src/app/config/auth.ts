import { randomBytes } from 'crypto';

export const authConfiguration = () => ({
  auth: {
    jwt_secret: randomBytes(32).toString('hex'),
    jwt_expiration: '1h',
  },
});
