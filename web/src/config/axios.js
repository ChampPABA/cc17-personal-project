import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/local-storage";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (error) => {
    if (error.response.status === 401) {
      removeAccessToken();
      window.location.assign("/login");
      return;
    }
    return Promise.reject(error);
  }
);

export default axios;
