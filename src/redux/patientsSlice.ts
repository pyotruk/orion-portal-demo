import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import Api from './api';
import {Patients} from "../structures/Patients";

export interface PatientsState {
  patients: Patients[];
  isPending: boolean;
}

const initialState: PatientsState = {
  patients: [],
  isPending: false,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload.patients;
        state.isPending = false;
      });
  },
});

export const selectPatients = (state: RootState): Patients[] => state.patients.patients;

export default patientsSlice.reducer;
