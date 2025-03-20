import { hashSync } from "bcrypt";

/**
 * Hashes a password using bcrypt.
 * @param password The password to hash.
 * @returns The hashed password.
 */
export const hashPassword = (password: string) => hashSync(password, 10);

/**
 * Generates valid random Romanian phone numbers.
 * @returns A valid phone number.
 */
export const generateRomanianPhoneNumber = () => {
  const countryCode = "+40";
  const mobilePrefix = ["7", "3", "6"][Math.floor(Math.random() * 3)];
  const randomDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return `${countryCode}${mobilePrefix}${randomDigits}`;
};
