import api from "./api.js";

type LoginPayload = {
  username: string;
  password: string;
};

type SignupPayload = {
  fullName: string;
  username: string;
  password: string;
};

export const login = async (data: LoginPayload) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const signup = async (data: SignupPayload) => {
  const res = await api.post("/user/signup", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/user/logout");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/user/me");
  return res.data;
};
