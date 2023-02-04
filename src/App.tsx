import * as React from "react";
import {Routes, Route} from "react-router-dom";
import AuthProvider from "./components/LoginPage/AuthProvider";
import LoginPage from "./components/LoginPage/LoginPage";
import Portal from "./components/Portal/Portal";
import BaseLayout from "./layouts/BaseLayout";
import RequireAuth from "./components/LoginPage/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Portal />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
