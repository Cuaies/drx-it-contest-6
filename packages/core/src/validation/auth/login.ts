import { ValidationSpecification } from "../../ts/interfaces";

/**
 * Validation constraints for the login request.
 */
export const LOGIN_VALIDATION_CONSTRAINTS: ValidationSpecification = {
  username: {
    minLength: 4,
    maxLength: 20,
    required: true,
  },
  password: {
    minLength: 4,
    maxLength: 20,
    required: true,
  },
};
