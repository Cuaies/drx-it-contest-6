import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// TODO: fix hardcoded urls
export const useProvideAuth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let storedUser;

    if (typeof localStorage.getItem("user") === "string") {
      storedUser = JSON.parse(localStorage.getItem("user") as string);
    }

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (bodyDto: any) => {
    axios
      .post("http://localhost:3000/users/register", bodyDto, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setUser(res.data.user);
          navigate("/");
        }
      })
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
      .then((res) => {
        const { id, name } = res.data;
        axios
          .get(`http://localhost:3000/users/${id}/roles`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            const userRoles = res.data.rows;
            const { roleName } = userRoles[userRoles.length - 1].role;
            localStorage.setItem(
              "user",
              JSON.stringify({ id, name, roleName }),
            );
            setUser({ id, name, roleName });
          });
      })
      .catch((e) => setErrors(e));
  };

  const logout = () => {
    return fetch("http://localhost:3000/users/logout", {
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
          localStorage.removeItem("user");
        }
      })
      .catch((e) => setErrors(e));
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
