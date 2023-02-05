import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState, store} from './store';
import Api from './api';
import {SessionToken} from "../structures/SessionToken";

const LOCAL_STORAGE_SESSION_TOKEN_KEY = "orion-portal-api-token";

export interface AuthState {
  token: SessionToken;
  isPending: boolean;
}

const initialState: AuthState = {
  token: window.localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN_KEY) || "",
  isPending: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (args: { user: string, password: string }) => {
    return await Api.login(args.user, args.password);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem(LOCAL_STORAGE_SESSION_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(LOCAL_STORAGE_SESSION_TOKEN_KEY, action.payload.sessionToken);
        state.token = action.payload.sessionToken;
        state.isPending = false;
      });
  },
});

export const {logout} = authSlice.actions;
export const getSessionToken = (state = store.getState()): SessionToken => state.auth.token;
export const getIsAuthenticated = (state: RootState): boolean => !!state.auth.token;
export const getIsPending = (state: RootState): boolean => state.auth.isPending;

export default authSlice.reducer;
