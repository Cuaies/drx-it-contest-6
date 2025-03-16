export interface AuthContextSpecification {
  user: null;
  errors: never[];
  isLoading: boolean;
  register: () => void;
  login: () => void;
  logout: () => void;
}
