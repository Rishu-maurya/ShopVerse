import API from "./api";

export const loginUser = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};