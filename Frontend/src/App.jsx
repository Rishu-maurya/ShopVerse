// src/App.jsx
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import Order from './pages/order';
import Login from './pages/login';
import Register from './pages/register';
import AddProduct from './pages/addProduct';
import MyProducts from './pages/myProducts';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/my-producs' element={<MyProducts />} />
        </Routes>
      </div>
      <Footer />
      
    </Router>
  );
}

export default App;