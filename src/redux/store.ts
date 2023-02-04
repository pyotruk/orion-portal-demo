import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import clinicianSlice from "./clinicianSlice";
import patientsSlice from "./patientsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clinician: clinicianSlice,
    patients: patientsSlice,
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
