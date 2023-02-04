import * as React from "react";
import {Outlet} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";

export default function BaseLayout() {
  let auth = useAuth();

  return (
    <div>
      {auth.isAuthenticated && <button onClick={() => auth.logout()}>Sign out</button>}

      <Outlet />
    </div>
  );
}
