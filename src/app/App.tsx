import * as React from "react";
import {Routes, Route} from "react-router-dom";
import AuthProvider from "../features/auth/AuthProvider";
import LoginView from "../views/LoginView";
import BaseLayout from "../layouts/BaseLayout";
import RequireAuth from "../features/auth/RequireAuth";
import PortalView from "../views/PortalView";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <PortalView />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
