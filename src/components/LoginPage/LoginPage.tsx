import * as React from "react";
import {useAuth} from "./AuthProvider";

export default function LoginPage() {
  let auth = useAuth();

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
          <label>Username: <input name="username" type="text" /></label>
        </div>
        <div>
          <label>Password: <input name="password" type="password" /></label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
