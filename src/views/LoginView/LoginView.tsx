import * as React from "react";
import {useAuth} from "../../auth/AuthProvider";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import {getIsPending} from "../../redux/authSlice";

export default function LoginView() {
  let auth = useAuth();
  const isPending: boolean = useAppSelector(getIsPending);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    auth.login(username, password);
  }

  return (
    <div>
      <h1>Clinical Portal</h1>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: <input name="username" type="text" autoComplete="username" /></label>
        </div>
        <div>
          <label>Password: <input name="password" type="password" autoComplete="current-password" /></label>
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            {!isPending && <span>Login</span>}
            {isPending && <CircularProgress />}
          </button>
        </div>
      </form>
    </div>
  );
}
