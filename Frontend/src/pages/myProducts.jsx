import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProducts, deleteProduct } from "../services/productService";
import "../styles/management.css";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products || data || []);
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || err.message || "Failed to load your products",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product")) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      setFeedback({ type: "success", message: "Product deleted successfully" });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || err.message || "Failed to delete product",
      });
    }
  };

  return (
  <main className="management-page">
    <h2>My Products</h2>
    {feedback && (
      <p className={`page-feedback page-feedback-${feedback.type}`} role="status">
        {feedback.message}
      </p>
    )}

    {loading ? (
      <p className="management-empty">Loading your products...</p>
    ) : products.length === 0 ? (
      <p className="management-empty">You haven't added any product yet.</p>
    ) : (
      <div className="management-product-grid">
        {products.map((item) => (
          <article key={item._id} className="management-product-card">
            <h3>{item.name}</h3>
            <p className="management-product-price">₹{item.price}</p>
            <p className="management-product-stock">Stock: {item.stock}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <Link to={`/edit-product/${item._id}`}>Edit</Link>
          </article>
        ))}
      </div>
    )
    }
  </main>
)
}

export default MyProducts;
