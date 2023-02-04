import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import clinicianSlice from "./clinicianSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clinician: clinicianSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
