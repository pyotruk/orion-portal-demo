import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import Api from './api';
import {ClinicianDetails} from "../structures/ClinicianDetails";

export interface ClinicianState {
  details: undefined | ClinicianDetails;
  isPending: boolean;
}

const initialState: ClinicianState = {
  details: undefined,
  isPending: false,
};

export const fetchClinicianDetails = createAsyncThunk(
  'clinician/details',
  async () => {
    return await Api.getClinician();
  }
);

export const clinicianSlice = createSlice({
  name: 'clinician',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicianDetails.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(fetchClinicianDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isPending = false;
      });
  },
});

export const getClinicianDetails = (state: RootState): undefined | ClinicianDetails => state.clinician.details;
export const getIsPending = (state: RootState): boolean => state.clinician.isPending;

export default clinicianSlice.reducer;
