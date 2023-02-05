jest.mock("../../app/api", () => ({
  getPatients: async (): Promise<PatientsDto> => {
    return Promise.resolve({
      patients: [
        {id: "1", name: "foo"},
        {id: "2", name: "bar"},
      ],
    });
  },
  getPatientDetails: async (patientId: PatientId): Promise<PatientDetails> => {
    return Promise.resolve(patientId === "1" ? {
      firstName: "foo",
      familyName: "foo",
      age: 41,
      sex: "Male",
    } : {
      firstName: "bar",
      familyName: "bar",
      age: 42,
      sex: "Female",
    });
  },
}));

import {store} from "../../app/store";
import {fetchPatients, selectPatientAndFetchDetails} from "./patientsSlice";
import {PatientDetails, PatientId, PatientsDto} from "../../structures/Patient";

describe("patients reducer", () => {
  it("should fetch patients list and the first patient details", async () => {
    await store.dispatch(fetchPatients());

    // since fetchPatients() triggers another action under the hood
    await new Promise((resolve) => {
      process.nextTick(resolve);
    });

    const state = store.getState().patients;

    expect(state.patients.length).toBe(2);
    expect(state.selectedPatientId).toBe("1");

    expect(state.patients[0].details).toBeDefined();
    expect(state.patients[1].details).not.toBeDefined();
  });

  it("should select the 2nd patient and fetch its details", async () => {
    await store.dispatch(selectPatientAndFetchDetails("2"));

    const state = store.getState().patients;

    expect(state.patients.length).toBe(2);
    expect(state.selectedPatientId).toBe("2");

    expect(state.patients[0].details).toBeDefined();
    expect(state.patients[1].details).toBeDefined();
  });
});
