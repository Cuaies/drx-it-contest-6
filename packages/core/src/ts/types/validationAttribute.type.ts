import { ValidationAttributes } from "../enums";

/**
 * Mapped type for validation attribute values.
 */
export type ValidationAttributeValues = {
  [ValidationAttributes.MinLength]: number;
  [ValidationAttributes.MaxLength]: number;
  [ValidationAttributes.Required]: boolean;
};
