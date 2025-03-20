import axios from "axios";
import { useState } from "react";

// TODO: fix hardcoded urls
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const register = (bodyDto: any) => {
    axios
      .post("http://localhost:3000/users/register", bodyDto, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log(res))
      .catch((e) => setErrors(e));
  };

  const login = (loginDto: any) => {
    axios
      .post("http://localhost:3000/users/login", loginDto, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => console.log(res))
      .catch((e) => setErrors(e));
  };

  const logout = () => {
    return fetch("http://localhost:3000/users/logout", {
      method: "POST",
    }).catch((e) => setErrors(e));
  };

  return {
    user,
    errors,
    isLoading,
    register,
    login,
    logout,
  };
};
