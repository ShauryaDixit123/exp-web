import axios from "axios";

const apiClient = (config: { token: string }) =>
  axios.create({
    baseURL: "http://localhost:8080/v1",
    headers: {
      Authorization: `${config.token}`,
    },
  });

export default apiClient;
