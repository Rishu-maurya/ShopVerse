import API from "./api";

export const getAllProducts = async () => {
  const { data } = await API.get("/product/all");
  return data;
};

export const getMyProducts = async () => {
  const { data } = await API.get("/product/my-products");
  return data;
};

export const createProduct = async ( productData) => {
  const { data } = await API.post("/product/create", productData);
  return data;
};

export const updateProduct = async (id, updatedProductData) => {
  const { data } = await API.put(`/product/update/${id}`, updatedProductData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/product/delete/${id}`);
  return data;
}