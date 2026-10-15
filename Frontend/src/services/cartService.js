import axiosInstance from "./axiosInstance";

export const getCart = async () => {
  const { data } = await axiosInstance.get("/addCart/getCart");
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await axiosInstance.post("/addCart/addToCart", { productId, quantity });
  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await axiosInstance.delete("/addCart/removeCartProduct", {
    data: { productId },
  });
  return data;
};
