export interface PatientsDto {
  patients: Patient[];
}

export type PatientId = string;

export interface Patient {
  id: PatientId;
  name: string;
  details?: PatientDetails;
}

export interface PatientDetails {
  title?: string;
  firstName: string;
  preferredName?: string;
  middleName?: string;
  familyName: string;
  suffix?: string;
  age: number;
  sex: "Male" | "Female" | "Unknown" | "Indeterminate";
}
