import * as React from "react";
import {Patient} from "../../structures/Patient";

export default function Patients(patients: Patient[]) {
  return (
    <div>
      {patients.map((patient: Patient) => {
        return <div>{patient.name}</div>;
      })}
    </div>
  );
}
