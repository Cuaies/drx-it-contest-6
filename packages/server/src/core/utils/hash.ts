import { hashSync } from 'bcrypt';

/**
 * Hashes a password using bcrypt.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export const hashPassword = (password: string) => hashSync(password, 10);
