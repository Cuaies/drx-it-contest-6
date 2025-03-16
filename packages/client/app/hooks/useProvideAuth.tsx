import { useState } from "react";

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const register = () => {};
  const login = () => {};
  const logout = () => {};

  return {
    user,
    errors,
    isLoading,
    register,
    login,
    logout,
  };
};
