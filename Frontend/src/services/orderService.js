import API from "./api";

export const getUserOrders = async () => {
  const { data } = await API.get("/order/getUserOrder");
  return data;
};

export const createOrder = async (shippingAddress) => {
  const { data } = await API.post("/order/createOrder", shippingAddress);
  return data;
};
