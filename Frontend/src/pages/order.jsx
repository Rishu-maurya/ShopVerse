// src/pages/Order.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "../services/orderService";
import "../styles/orders.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data.orders || data || []);
    } catch (err) {
      console.error("Order fetch error:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered") return "delivered";
    if (s === "cancelled" || s === "canceled") return "cancelled";
    return "processing";
  };

  if (loading)
    return (
      <div className="orders-container">
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: "8px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e0e0e0", borderTopColor: "#2874F0", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}></div>
          <p style={{ color: "#878787" }}>Loading Orders...</p>
        </div>
      </div>
    );

  return (
    <div className="orders-container">
      <div className="orders-title">📦 My Orders</div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.5" style={{ margin: "0 auto 20px", display: "block" }}>
            <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
            <path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
          </svg>
          <h3>No orders yet!</h3>
          <p style={{ marginBottom: "20px" }}>Looks like you haven't placed any orders yet.</p>
          <Link to="/products" style={{ background: "#2874F0", color: "#fff", padding: "12px 32px", borderRadius: "4px", fontWeight: "700", textDecoration: "none", fontSize: "14px" }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id-label">Order ID</span>
                  <div className="order-id-val">#{order._id}</div>
                </div>
                <span className={`status-badge ${getStatusClass(order.orderStatus || order.status)}`}>
                  {order.orderStatus || order.status || "Processing"}
                </span>
              </div>

              <div className="order-body">
                <span className="order-items-count">
                  Total Items: <b>{order.items?.reduce((total, item) => total + item.quantity, 0) || 0}</b>
                </span>
                <span className="order-price">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;