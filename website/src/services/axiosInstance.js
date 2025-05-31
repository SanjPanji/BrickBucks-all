import axios from "axios";
import { refreshToken } from "./auth";
import { logoutUser } from "./auth";

const a = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавление access токена
a.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехват 401 — обновление access токена
a.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshToken();
        localStorage.setItem("token", data.access);
        a.defaults.headers.Authorization = `Bearer ${data.access}`;
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return a(originalRequest);
      } catch (refreshError) {
        // refresh не сработал — выходим
        logoutUser();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default a;

