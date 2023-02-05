import * as React from "react";
import {PatientDetails} from "../structures/Patient";
import {ClinicianDetails} from "../structures/ClinicianDetails";

export default function PersonName(props: {
  person: ClinicianDetails | PatientDetails,
}) {
  return (
    <span>
      <span>{props.person?.title ? props.person?.title + ". " : ""}</span>
      {props.person?.preferredName && <span>
        {props.person?.preferredName} ({props.person.firstName})
      </span>}
      {!props.person?.preferredName && <span>
        {props.person?.firstName}
      </span>}
      <span>
        {props.person?.middleName} {props.person?.familyName} {props.person?.suffix}
      </span>
    </span>
  );
}
