import a from "./axiosInstance";

export const loginUser = ({ email, password }) =>
  a.post("auth/login/", { email, password });

export const registerUser = ({ email, password, phone, username }) =>
  a.post("auth/register/", { email, password, phone, username });

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("No refresh token available");

  // Правильный вызов к своему эндпоинту обновления токена
  return a.post("auth/token/refresh/", { refresh });
};

export const logoutUser = () => {
  console.log("Logging out user, removing tokens");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // Можно добавить очистку состояния, уведомления и т.п.
};


