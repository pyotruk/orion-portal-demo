import * as React from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {
  fetchClinicianDetails,
  getClinicianDetails,
  getIsPending as getIsClinicianPending
} from "../features/clinician/clinicianSlice";
import {useEffect} from "react";
import PatientsListComponent from "../features/patients/PatientsListComponent";
import {fetchPatients, getIsPending as getIsPatientsPending} from "../features/patients/patientsSlice";
import {Box, Button, CircularProgress, Container, Grid} from "@mui/material";
import {useAuth} from "../features/auth/AuthProvider";
import {ClinicianDetails} from "../structures/ClinicianDetails";
import PersonName from "../shared/PersonName";

export default function PortalView() {
  const auth = useAuth();
  const dispatch = useAppDispatch();

  const clinician: undefined | ClinicianDetails = useAppSelector(getClinicianDetails);
  const isClinicianPending: boolean = useAppSelector(getIsClinicianPending);
  const isPatientsPending: boolean = useAppSelector(getIsPatientsPending);

  useEffect(() => {
    dispatch(fetchClinicianDetails());
    dispatch(fetchPatients());
  }, []);

  return (
    <Container>
      <Grid container sx={{padding: "1em"}}>
        <Grid item xs={6}>
          <h1>Clinical Portal</h1>
        </Grid>
        <Grid item xs={6} sx={{textAlign: "right"}}>
          <Box sx={{marginBottom: "1em"}}>
            <Button variant="text" onClick={() => auth.logout()}>sign out</Button>
          </Box>
          <Box>
            {isClinicianPending && <CircularProgress/>}
            {!isClinicianPending && clinician && <PersonName person={clinician}/>}
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          {isPatientsPending && <CircularProgress sx={{margin: "1em"}}/>}
          {!isPatientsPending && <PatientsListComponent/>}
        </Grid>
      </Grid>
    </Container>
  );
}
