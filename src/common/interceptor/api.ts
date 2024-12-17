import axios from "axios";

const apiClient = () =>
  axios.create({
    baseURL: "http://localhost:9000/v1",
    headers: {
      Authorization:
        localStorage.getItem("user_details") !== "" &&
        JSON.parse(localStorage.getItem("user_details") || "").id,
    },
  });

apiClient().interceptors.request.use((config) => {
  config.url = `http://localhost:9000/v1/${config.url}`;
  const id = JSON.parse(localStorage.getItem("user_details") || "").id;
  config.headers.Authorization = `${id}`;
  return config;
});

export default apiClient;
