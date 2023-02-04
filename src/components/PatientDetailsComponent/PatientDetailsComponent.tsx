import * as React from "react";
import {PatientDetails} from "../../structures/Patients";

export default function PatientDetailsComponent(patient: PatientDetails) {
  return (
    <div>
      {Object.keys(patient).map((key: string) => {
        return <div>{key}: {patient[key as keyof PatientDetails]}</div>;
      })}
    </div>
  );
}
