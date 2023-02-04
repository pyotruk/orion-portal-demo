import * as React from "react";
import {Patient} from "../../structures/Patient";

export default function PatientsListComponent(patients: Patient[]) {
  return (
    <ul>
      {patients.map((patient: Patient) => {
        return <li>
          <b>#{patient.id}</b>&nbsp;
          <span>{patient.name}</span>
        </li>;
      })}
    </ul>
  );
}
