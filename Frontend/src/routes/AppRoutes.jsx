import { Route, Routes } from "react-router-dom";
import AddProduct from "../pages/addProduct";
import Cart from "../pages/cart";
import EditProduct from "../pages/editProduct";
import Home from "../pages/home";
import Login from "../pages/login";
import MyProducts from "../pages/myProducts";
import Order from "../pages/order";
import ProductDetail from "../pages/productDetail";
import Products from "../pages/products";
import Register from "../pages/register";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/orders" element={<Order />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/my-products" element={<MyProducts />} />
    <Route path="/edit-product/:id" element={<EditProduct />} />
  </Routes>
);

export default AppRoutes;
