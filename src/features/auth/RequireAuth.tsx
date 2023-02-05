import {useAuth} from "./AuthProvider";
import {Navigate, useLocation} from "react-router-dom";
import * as React from "react";

export default function RequireAuth({children}: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}
