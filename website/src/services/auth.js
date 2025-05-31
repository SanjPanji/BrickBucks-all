import a from "./axiosInstance";

export const loginUser = ({email, password}) =>
  a.post("auth/login/", { email, password});

export const registerUser = ({email, password, phone, username}) =>
  a.post("auth/register/", { email, password, phone, username});

export const refreshToken = () => {
  const refresh = localStorage.getItem("refresh");
  return a.post("auth/refresh/", { refresh });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
};
