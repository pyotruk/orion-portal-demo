import {SessionTokenDto} from "../structures/SessionToken";
import {selectSessionToken} from "./authSlice";
import {ClinicianDetails} from "../structures/ClinicianDetails";

const API_URL = "";
const DEFAULT_HTTP_HEADERS = {
  "Content-Type": "application/json"
};

const Api = {
  login: async (user: string, password: string): Promise<SessionTokenDto> => {
    const response: Response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        ...DEFAULT_HTTP_HEADERS,
        "Authorization": "Basic " + window.btoa(`${user}:${password}`),
      },
    });
    return await response.json();
  },
  getClinician: async (): Promise<ClinicianDetails> => {
    const response: Response = await fetch(`${API_URL}/clinician-details`, {
      method: "GET",
      headers: {
        ...DEFAULT_HTTP_HEADERS,
        "Authorization": selectSessionToken(),
      },
    });
    return await response.json();
  },
}

export default Api;
