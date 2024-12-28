import axios from "axios";

const apiClient = (params?: { action: string }) => {
  const client = axios.create({
    baseURL: "http://localhost:9000/v1",
    headers: {
      Authorization:
        localStorage.getItem("user_details") !== "" &&
        JSON.parse(localStorage.getItem("user_details") || "").id,
    },
  });
  client.interceptors.request.use((config) => {
    config.url = `http://localhost:9000/v1/${config.url}`;
    const id =
      localStorage.getItem("user_details") &&
      JSON.parse(localStorage.getItem("user_details") || "").id;
    config.headers.Authorization = `${id}`;
    config.params = { ...config.params, action: params?.action };
    // if (params?.action) config.headers["action"] = params?.action;
    return config;
  });
  return client;
};

export default apiClient;
