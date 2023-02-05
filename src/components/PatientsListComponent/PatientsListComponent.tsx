import * as React from "react";
import {Patient, PatientId} from "../../structures/Patient";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  getIsPatientDetailsPending,
  getPatients,
  getSelectedPatientId,
  selectPatientAndFetchDetails
} from "../../redux/patientsSlice";
import {Box, CircularProgress, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import PatientDetailsComponent from "../PatientDetailsComponent/PatientDetailsComponent";

export default function PatientsListComponent() {
  const dispatch = useAppDispatch();

  const patients: Patient[] = useAppSelector(getPatients);
  const selectedPatientId: undefined | PatientId = useAppSelector(getSelectedPatientId);
  const isPatientDetailsPending: undefined | PatientId = useAppSelector(getIsPatientDetailsPending);

  const handleChange = (event: React.SyntheticEvent, selectedPatientId: string) => {
    dispatch(selectPatientAndFetchDetails(selectedPatientId));
  };

  return (
    <Box sx={{ width: '100%' }}>
      {selectedPatientId && <TabContext value={selectedPatientId}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            {patients && patients.map(patient => {
              return <Tab
                label={patient.name}
                value={patient.id}
                key={patient.id}
              />;
            })}
          </TabList>
        </Box>
        {patients && patients.map(patient => {
          return <TabPanel value={patient.id} key={patient.id}>
            {isPatientDetailsPending === patient.id &&
              <CircularProgress />}
            {isPatientDetailsPending !== patient.id && patient.details &&
              <PatientDetailsComponent patient={patient.details}/>}
          </TabPanel>
        })}
      </TabContext>}
    </Box>
  );
}
