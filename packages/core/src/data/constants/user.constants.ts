import { faker } from "@faker-js/faker";
import { generateRomanianPhoneNumber, hashPassword } from "../../utils";

const PAST_REF = faker.date.past({ years: 1 });
const VALID_STRONG_PASSWORD = "89G1wJuBLbGziIs$.";

/**
 * Collection of hard-coded user data.
 */
export const USER_CONSTANTS = {
  adminUser: {
    email: "admin@admin.com",
    name: faker.person.fullName(),
    phoneNumber: generateRomanianPhoneNumber(),
    passwordHash: hashPassword(VALID_STRONG_PASSWORD),
    createdAt: faker.date.past({ refDate: PAST_REF }),
    updatedAt: PAST_REF,
    deletedAt: null,
  },
  misc: {
    validStrongPassword: VALID_STRONG_PASSWORD,
  },
};
