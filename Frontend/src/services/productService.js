import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/product/all");
  return data;
};

export const getMyProducts = async () => {
  const { data } = await axiosInstance.get("/product/my-products");
  return data;
};

export const createProduct = async ( productData) => {
  const { data } = await axiosInstance.post("/product/create", productData);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/product/${id}`);
  return data;
};

export const updateProduct = async (id, updatedProductData) => {
  const { data } = await axiosInstance.put(`/product/update/${id}`, updatedProductData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/product/delete/${id}`);
  return data;
}