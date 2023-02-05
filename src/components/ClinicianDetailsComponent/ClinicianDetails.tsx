import * as React from "react";
import {ClinicianDetails} from "../../structures/ClinicianDetails";
import {getClinicianDetails} from "../../redux/clinicianSlice";
import {useAppSelector} from "../../redux/hooks";

export default function ClinicianDetailsComponent() {
  const clinician: undefined | ClinicianDetails = useAppSelector(getClinicianDetails);

  return (
    <div>
      {clinician && Object.keys(clinician).map((key: string) => {
        return <div key={key}>{key}: {clinician[key as keyof ClinicianDetails]}</div>;
      })}
    </div>
  );
}
