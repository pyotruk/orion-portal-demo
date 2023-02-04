import {SessionTokenDto} from "../structures/SessionToken";

const API_URL = "";
const HTTP_HEADERS = {
  "Content-Type": "application/json"
};

const Api = {
  login: async (user: string, password: string): Promise<SessionTokenDto> => {
    const response: Response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        ...HTTP_HEADERS,
        "Authorization": "Basic " + window.btoa(`${user}:${password}`),
      },
    });
    return await response.json();
  },
}

export default Api;
