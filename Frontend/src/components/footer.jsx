import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">ShopVerse</Link>
        <p className="footer-tagline">
          A simpler way to find the things you love.
        </p>
      </div>

      <div className="footer-col">
        <h4>Explore</h4>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} ShopVerse
    </div>
  </footer>
);

export default Footer;
