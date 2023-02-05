import * as React from "react";
import {login, logout, getIsAuthenticated} from "./authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

interface AuthContextType {
  isAuthenticated: boolean,
  login: (user: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({children}: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(getIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return <AuthContext.Provider value={{
    isAuthenticated,

    login: (user: string, password: string) => {
      dispatch(login({user, password})).then(() => {
        navigate(from, {replace: true});
      });
    },
    logout: () => {
      dispatch(logout());
      navigate("/", {replace: true});
    },
  }}>{children}</AuthContext.Provider>;
}
