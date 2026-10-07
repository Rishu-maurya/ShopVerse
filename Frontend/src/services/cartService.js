import API from "./api";

export const getCart = async () => {
  const { data } = await API.get("/addCart/getCart");
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await API.post("/addCart/addToCart", { productId, quantity });
  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await API.delete("/addCart/removeCartProduct", {
    data: { productId },
  });
  return data;
};
