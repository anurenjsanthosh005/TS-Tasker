import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { User } from "../data/mock";
import { useNavigate } from "react-router-dom";

type AuthContextProvider = {
  login: User | null;
  userLogin: (data: User) => void;
  userLogout: () => void;
};

export const AuthContext = createContext<AuthContextProvider | undefined>(
  undefined
);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(() => {
    const stored = localStorage.getItem("USER_DATA");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const userLogin = (data: User) => {
    if (data) {
      console.log("user logged in data :", data);
      localStorage.setItem("USER_DATA", JSON.stringify(data));
      setLogin(data);
    }
  };

  const userLogout = () => {
    console.log("userlogout");
    localStorage.removeItem("USER_DATA");
    setLogin(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({ login, userLogin, userLogout }), [login]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
