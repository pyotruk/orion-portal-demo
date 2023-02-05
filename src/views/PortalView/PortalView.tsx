import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchClinicianDetails, getIsPending as getIsClinicianPending} from "../../redux/clinicianSlice";
import {useEffect} from "react";
import ClinicianDetailsComponent from "../../components/ClinicianDetailsComponent/ClinicianDetails";
import PatientsListComponent from "../../components/PatientsListComponent/PatientsListComponent";
import {fetchPatients, getIsPending as getIsPatientsPending} from "../../redux/patientsSlice";
import {CircularProgress} from "@mui/material";

export default function PortalView() {
  const dispatch = useAppDispatch();

  const isClinicianPending: boolean = useAppSelector(getIsClinicianPending);
  const isPatientsPending: boolean = useAppSelector(getIsPatientsPending);

  useEffect(() => {
    dispatch(fetchClinicianDetails());
    dispatch(fetchPatients());
  }, []);

  return (
    <div>
      <h1>Clinical Portal</h1>

      {isClinicianPending && <CircularProgress />}
      {!isClinicianPending && <ClinicianDetailsComponent />}

      {isPatientsPending && <CircularProgress />}
      {!isPatientsPending && <PatientsListComponent />}
    </div>
  );
}
