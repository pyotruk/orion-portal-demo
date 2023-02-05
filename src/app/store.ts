import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from "../features/auth/authSlice";
import clinicianSlice from "../features/clinician/clinicianSlice";
import patientsSlice from "../features/patients/patientsSlice";

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
