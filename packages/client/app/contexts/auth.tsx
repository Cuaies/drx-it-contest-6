import { createContext } from "react";
import type { AuthContextSpecification } from "../ts/interfaces";

export const AuthContext = createContext<AuthContextSpecification>({
  user: null,
  errors: [],
  isLoading: false,
  register: () => {},
  login: () => {},
  logout: () => {},
});
