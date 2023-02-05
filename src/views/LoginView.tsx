import * as React from "react";
import {useAuth} from "../features/auth/AuthProvider";
import {Box, Button, CircularProgress, Container, TextField} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {getError, getIsPending} from "../features/auth/authSlice";
import "./LoginView.scss";

export default function LoginView() {
  const auth = useAuth();
  const isPending: boolean = useAppSelector(getIsPending);
  const error: string = useAppSelector(getError);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    auth.login(username, password);
  }

  return (
    <Container className="LoginView" maxWidth="xs">

      <Box sx={{margin: "4em 0"}}>
        <h1>Clinical Portal</h1>
        <h1>Sign In</h1>
      </Box>

      <Box>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              name="username"
              required
              label="Username"
              variant="outlined"
              autoComplete="username"
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              required
              label="Password"
              variant="outlined"
              autoComplete="current-password"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div>
            <Button variant="contained" type="submit" disabled={isPending}>
              {!isPending && <span>Login</span>}
              {isPending && <CircularProgress/>}
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
