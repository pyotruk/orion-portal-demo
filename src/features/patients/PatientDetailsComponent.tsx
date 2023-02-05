import * as React from "react";
import {PatientDetails} from "../../structures/Patient";
import PersonName from "../../shared/PersonName";

export default function PatientDetailsComponent(props: {
  patient: PatientDetails,
}) {
  return (
    <div>
      <p><PersonName person={props.patient}/></p>
      <p><b>Age:</b> {props.patient.age}</p>
      <p><b>Sex:</b> {props.patient.sex}</p>
    </div>
  );
}
