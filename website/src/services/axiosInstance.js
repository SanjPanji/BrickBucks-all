import axios from "axios";
import { refreshToken, logoutUser } from "./auth";

const a = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: { "Content-Type": "application/json" },
});

// Добавляем access token в каждый запрос
a.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем 401 ошибки и обновляем токен
a.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если 401 и ещё не делали retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshToken();

        // Сохраняем новый access token
        localStorage.setItem("access_token", data.access);

        // Обновляем токен в заголовках axios по умолчанию и для повторного запроса
        a.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        // Повторяем исходный запрос с новым токеном
        return a(originalRequest);
      } catch (refreshError) {
        // Если обновить не удалось — логаут и переход на логин
        logoutUser();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Все остальные ошибки пробрасываем дальше
    return Promise.reject(error);
  }
);

export default a;




