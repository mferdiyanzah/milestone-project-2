import { useState } from "react";
import { ILoginForm } from "../components/login-form/login-form.interface";
import { IRegisterForm } from "../pages/register/register.interface";
import { compareSync } from "bcryptjs";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<IRegisterForm | null>(
    JSON.parse(localStorage.getItem("currentUser") ?? "null") || null
  );
  const [users, setUsers] = useState<IRegisterForm[]>(
    JSON.parse(localStorage.getItem("users") ?? "[]") || []
  );

  const login = ({ username, password }: ILoginForm) => {
    const user = users.find((user) => user.username === username);

    const isPasswordValid = compareSync(
      password,
      users.find((user) => user.username === username)?.password ?? ""
    );
    if (isPasswordValid && user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (newUser: IRegisterForm) => {
    const existingUser = users.find((user) => user.email === newUser.email);
    if (!existingUser) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return true;
    }
    return false;
  };

  return {
    currentUser,
    login,
    logout,
    register,
  };
};

export default useAuth;
