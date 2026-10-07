// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCart } from "../redux/slices/cartSlice";
import { addToCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import "../styles/products.css";

const featureHighlights = [
  { icon: "⚡", label: "Fast delivery" },
  { icon: "🛡️", label: "Secure checkout" },
  { icon: "↩️", label: "Easy returns" },
  { icon: "🎁", label: "Exclusive deals" },
];

const categoryTags = [
  "Fashion", "Electronics", "Home", "Beauty", "Accessories", "Wellness",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.products || data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId);
      dispatch(setCart(data.cart));
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Please login to add items");
    }
  };

  return (
    <div className="products-wrapper">
      <div className="hero-banner">
        <div className="hero-copy">
          <span className="hero-badge">🔥 Best Deals</span>
          <h1>Shop more, save smarter.</h1>
          <p>
            Discover trending styles and smart essentials at unbeatable prices.
            Free delivery on orders above ₹499 and fresh offers every day.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="primary-btn">Shop now</Link>
            <Link to="/products" className="secondary-btn">View offers</Link>
          </div>

          <div className="hero-metrics">
            <div>
              <strong>24k+</strong>
              <span>Happy shoppers</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>2-day</strong>
              <span>Fast delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Promotional product card">
          <div className="floating-card main-card">
            <span className="card-label">Flash Sale</span>
            <strong>Up to 70% OFF</strong>
          </div>

          <div className="showcase-box">
            <div className="showcase-badge">New season</div>
            <div className="showcase-visual">
              <div className="showcase-glow" />
            </div>
          </div>

          <div className="floating-card secondary-card">
            <span className="card-label">Free shipping</span>
            <strong>Orders ₹499+</strong>
          </div>
        </div>
      </div>

      <div className="promo-strip">
        {featureHighlights.map((item) => (
          <div key={item.label} className="promo-item">
            <span>{item.icon}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="category-row">
        {categoryTags.map((tag) => (
          <Link key={tag} to="/products" className="category-pill">
            {tag}
          </Link>
        ))}
      </div>

      <div className="section-header">
        <h2>Featured Products</h2>
        <Link to="/products" className="view-all-btn">View All</Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p style={{ color: "#878787", fontSize: "14px" }}>Loading Products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found!</h3>
          <p>Check back later for amazing deals.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((item) => (
            <div key={item._id} className="product-card">
              <div className="card-image-box">
                <span className="card-tag">Trending</span>
                <img src={item.images?.[0] || "https://via.placeholder.com/200"} alt={item.name} />
              </div>

              <div className="card-content">
                <span className="card-category">{item.category || "General"}</span>
                <h3 className="card-title">{item.name}</h3>

                <div className="card-rating">
                  <span className="rating-badge">4.2 ★</span>
                  <span className="rating-count">(1,234)</span>
                </div>

                <div className="card-bottom">
                  <div className="price-wrap">
                    <span className="card-price">₹{item.price}</span>
                    <span className="card-mrp">₹{Math.round(item.price * 1.3)}</span>
                  </div>
                  <span className="card-discount">23% off</span>
                  <button className="btn-add-cart" onClick={() => handleAddToCart(item._id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;