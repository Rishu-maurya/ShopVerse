import axiosInstance from "./axiosInstance";

export const getUserOrders = async () => {
  const { data } = await axiosInstance.get("/order/getUserOrder");
  return data;
};

export const createOrder = async (shippingAddress) => {
  const { data } = await axiosInstance.post("/order/createOrder", shippingAddress);
  return data;
};
