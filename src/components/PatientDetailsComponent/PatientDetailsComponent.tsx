import * as React from "react";
import {PatientDetails} from "../../structures/Patient";

export default function PatientDetailsComponent(props: {
  patient: PatientDetails,
}) {
  return (
    <div>
      {Object.keys(props.patient).map((key: string) => {
        return <div>{key}: {props.patient[key as keyof PatientDetails]}</div>;
      })}
    </div>
  );
}
