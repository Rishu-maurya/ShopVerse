// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCart } from "../redux/slices/cartSlice";
import { addToCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import "../styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-wrapper">
      {/* Header Row */}
      <div className="section-header">
        <h2>All Products</h2>
        <input
          type="text"
          placeholder="🔍  Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="products-search-bar"
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p style={{ color: "#878787", fontSize: "14px" }}>Loading Products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>No products found!</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <div key={item._id} className="product-card">
              <div className="card-image-box">
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
                  <span className="card-price">
                    ₹{item.price}
                    <span className="card-mrp">₹{Math.round(item.price * 1.3)}</span>
                  </span>
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

export default Products;