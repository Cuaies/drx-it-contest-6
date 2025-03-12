import { ValidationAttributeValues } from "../types";

export interface ValidationSpecification {
  [key: string]: {
    [K in keyof ValidationAttributeValues]?: ValidationAttributeValues[K];
  };
}
