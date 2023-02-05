import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import Api from './api';
import {Patient, PatientId} from "../structures/Patient";
import {authSlice} from "./authSlice";

export interface PatientsState {
  patients: Patient[];
  isPending: boolean;
  selectedPatientId: undefined | PatientId;
}

const initialState: PatientsState = {
  patients: [],
  isPending: false,
  selectedPatientId: undefined,
};

export const fetchPatients = createAsyncThunk(
  'patients/list',
  async () => {
    return await Api.getPatients();
  }
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    selectPatient: (state, action: PayloadAction<PatientId>) => {
      state.selectedPatientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload.patients;
        state.selectedPatientId = action.payload.patients[0].id;
        state.isPending = false;
      });
  },
});

export const {selectPatient} = patientsSlice.actions;

export const getPatients = (state: RootState): Patient[] => state.patients.patients;
export const getSelectedPatientId = (state: RootState): undefined | PatientId => state.patients.selectedPatientId;

export default patientsSlice.reducer;
