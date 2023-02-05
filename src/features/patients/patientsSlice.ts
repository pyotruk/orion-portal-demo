import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../../app/store";
import Api from "../../app/api";
import {Patient, PatientDetails, PatientId, PatientsDto} from "../../structures/Patient";

export interface PatientsState {
  patients: Patient[];
  isPending: boolean;
  selectedPatientId: undefined | PatientId;
  isPatientDetailsPending: undefined | PatientId;
}

const initialState: PatientsState = {
  patients: [],
  isPending: false,
  selectedPatientId: undefined,
  isPatientDetailsPending: undefined,
};

export const fetchPatients = createAsyncThunk<
  PatientsDto,
  void,
  {dispatch: AppDispatch}
>(
  "patients/list",
  async (_, {dispatch}) => {
    const patients: PatientsDto = await Api.getPatients();
    dispatch(selectPatientAndFetchDetails(patients.patients[0].id));
    return patients;
  }
);

export const selectPatientAndFetchDetails = createAsyncThunk<
  PatientDetails,
  PatientId,
  {state: RootState}
>(
  "patients/details",
  async (patientId: PatientId, {getState}): Promise<PatientDetails> => {
    const patients: Patient[] = getPatients(getState());
    const patientDetails: undefined | PatientDetails = patients.find(patient => patient.id === patientId)?.details;

    return patientDetails
      ? patientDetails
      : await Api.getPatientDetails(patientId);
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload.patients;
        state.isPending = false;
      })
      .addCase(selectPatientAndFetchDetails.pending, (state, action) => {
        state.selectedPatientId = action.meta.arg;
        state.isPatientDetailsPending = action.meta.arg;
      })
      .addCase(selectPatientAndFetchDetails.fulfilled, (state, action) => {
        const idx = state.patients.findIndex(patient => patient.id === state.selectedPatientId);
        state.patients[idx].details = action.payload;
        state.isPatientDetailsPending = undefined;
      });
  },
});

export const getPatients = (state: RootState): Patient[] => state.patients.patients;
export const getSelectedPatientId = (state: RootState): undefined | PatientId => state.patients.selectedPatientId;
export const getIsPending = (state: RootState): boolean => state.patients.isPending;
export const getIsPatientDetailsPending = (state: RootState): undefined | PatientId => state.patients.isPatientDetailsPending;

export default patientsSlice.reducer;
