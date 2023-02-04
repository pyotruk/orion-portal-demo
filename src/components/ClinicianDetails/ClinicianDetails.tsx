import * as React from "react";
import {Clinician} from "../../structures/Clinician";

export default function ClinicianDetails(clinician: Clinician) {
  return (
    <div>
      {Object.keys(clinician).map((key: string) => {
        return <div>{key}: {clinician[key as keyof Clinician]}</div>;
      })}
    </div>
  );
}
