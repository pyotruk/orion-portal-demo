import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import Api from './api';
import {SessionToken} from "../structures/SessionToken";

export interface AuthState {
  token: SessionToken;
  isPending: boolean;
}

const initialState: AuthState = {
  token: "",
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
      // TODO sessionStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.sessionToken;
        state.isPending = false;
      });
  },
});

export const {logout} = authSlice.actions;
export const selectSessionToken = (state: RootState): SessionToken => state.auth.token;
export const selectIsAuthenticated = (state: RootState): boolean => !!state.auth.token;

export default authSlice.reducer;
