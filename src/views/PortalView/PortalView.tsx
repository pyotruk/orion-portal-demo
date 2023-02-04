import * as React from "react";
import {useAppDispatch} from "../../redux/hooks";
import {fetchClinicianDetails} from "../../redux/clinicianSlice";
import {useEffect} from "react";
import {fetchPatients} from "../../redux/patientsSlice";
import ClinicianDetailsComponent from "../../components/ClinicianDetailsComponent/ClinicianDetails";
import PatientsListComponent from "../../components/PatientsListComponent/PatientsListComponent";

export default function PortalView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClinicianDetails());
    dispatch(fetchPatients());
  }, []);

  return (
    <div>
      <h1>Clinical Portal</h1>
      <ClinicianDetailsComponent />
      <PatientsListComponent />
    </div>
  );
}
