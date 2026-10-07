// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-logo">ShopVerse</div>
          <div className="footer-tagline">India ka Fashion Capital</div>
        </div>

        <div className="footer-col">
          <h4>About</h4>
          <a href="/">About Us</a>
          <a href="/">Careers</a>
          <a href="/">Press</a>
          <a href="/">Corporate Information</a>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="/">Payments</a>
          <a href="/">Shipping</a>
          <a href="/">Cancellation & Returns</a>
          <a href="/">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Policy</h4>
          <a href="/">Return Policy</a>
          <a href="/">Terms of Use</a>
          <a href="/">Security</a>
          <a href="/">Privacy</a>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ShopVerse Internet Private Limited. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;