import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import Api from './api';
import {Patient, PatientDetails, PatientId, PatientsDto} from "../structures/Patient";

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
  async (_, thunk) => {
    const patients: PatientsDto = await Api.getPatients();
    thunk.dispatch(selectPatientAndFetchDetails(patients.patients[0].id));
    return patients;
  }
);

export const selectPatientAndFetchDetails = createAsyncThunk(
  'patients/details',
  async (patientId: PatientId, thunk) => {
    return await Api.getPatientDetails(patientId);
  }
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload.patients;
        state.isPending = false;
      })
      .addCase(selectPatientAndFetchDetails.fulfilled, (state, action) => {
        state.selectedPatientId = action.meta.arg;
        const idx = state.patients.findIndex(patient => patient.id === state.selectedPatientId);
        state.patients[idx].details = action.payload;
      });
  },
});

export const getPatients = (state: RootState): Patient[] => state.patients.patients;
export const getSelectedPatientId = (state: RootState): undefined | PatientId => state.patients.selectedPatientId;

export default patientsSlice.reducer;
