import { ValidationSpecification } from "../../ts/interfaces";
import { LOGIN_VALIDATION_CONSTRAINTS } from "./login";

export const REGISTER_VALIDATION_CONSTRAINTS: ValidationSpecification = {
  ...LOGIN_VALIDATION_CONSTRAINTS,
  email: {
    required: true,
  },
  confirmPassword: {
    required: true,
  },
};
