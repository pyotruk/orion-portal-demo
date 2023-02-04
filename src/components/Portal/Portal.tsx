import * as React from "react";
import ClinicianDetailsComponent from "../ClinicianDetailsComponent/ClinicianDetails";
import {useAppDispatch} from "../../redux/hooks";
import {fetchClinicianDetails} from "../../redux/clinicianSlice";
import {useEffect} from "react";

export default function Portal() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClinicianDetails());
  }, []);

  return (
    <div>
      <h1>Clinical Portal</h1>
      <ClinicianDetailsComponent />
    </div>
  );
}
