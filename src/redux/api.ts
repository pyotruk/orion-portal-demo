const API_URL = "";
const HTTP_HEADERS = {
  "Content-Type": "application/json"
};

const AuthApi = {
  login: (user: string, password: string) => fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      ...HTTP_HEADERS,
      "Authorization": "Basic YW15YjphbXliX3B3", // TODO un-hardcode
    },
  }),
}

export default AuthApi;
