import * as React from "react";
import {Patients} from "../../structures/Patients";
import {useAppSelector} from "../../redux/hooks";
import {selectPatients} from "../../redux/patientsSlice";

export default function PatientsListComponent() {
  const patients: Patients[] = useAppSelector(selectPatients);

  return (
    <ul>
      {patients && patients.map((patient: Patients) => {
        return <li key={patient.id}>
          <b>#{patient.id}</b>&nbsp;
          <span>{patient.name}</span>
        </li>;
      })}
    </ul>
  );
}
