import { AuthContext } from "../../contexts";
import { useProvideAuth } from "../../hooks";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
