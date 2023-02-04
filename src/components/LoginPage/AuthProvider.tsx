import * as React from "react";
import {login, logout, selectIsAuthenticated} from "../../redux/authSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchClinicianDetails} from "../../redux/clinicianSlice";

interface AuthContextType {
  isAuthenticated: boolean,
  login: (user: string, password: string) => void;
  logout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  let value = {
    isAuthenticated,

    login: (user: string, password: string) => {
      dispatch(login({user, password})).then(() => {
        navigate(from, { replace: true });
      });
    },
    logout: () => {
      dispatch(logout());
      navigate("/", { replace: true });
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
