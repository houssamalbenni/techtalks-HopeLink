import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000",
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("Attaching token to request:", token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      if (typeof window !== "undefined") {
        const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (currentPath && currentPath !== "/login") {
          localStorage.setItem("returnTo", currentPath);
        }
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
