// src/pages/Cart.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, clearCartState } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCart, removeFromCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import "../styles/cart.css";

const Cart = () => {
  const { items = [], totalAmount = 0 } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const dispatch = useDispatch();

  const fetchCart = useCallback(async () => {
    try {
      const data = await getCart();
      dispatch(setCart(data.cart || data));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to load your cart");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemoveItem = async (productId) => {
    try {
      const data = await removeFromCart(productId);
      dispatch(setCart(data.cart));
      toast.info("Item removed from cart");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to remove item");
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    setCheckoutLoading(true);
    try {
      await createOrder(shippingAddress);
      toast.success("Order placed successfully! 🎉");
      dispatch(clearCartState());
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Checkout failed!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const discount = Math.round(totalAmount * 0.1);
  const finalAmount = totalAmount - discount;

  if (loading)
    return (
      <div className="cart-container">
        <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: "8px", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #e0e0e0", borderTopColor: "#2874F0", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}></div>
          <p style={{ color: "#878787" }}>Loading your cart...</p>
        </div>
      </div>
    );

  return (
    <div className="cart-container">
      <div className="cart-header-bar">
        My Cart {items.length > 0 && <span style={{ fontSize: "14px", color: "#878787", fontWeight: "400" }}>({totalItems} {totalItems === 1 ? "item" : "items"})</span>}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.5" style={{ margin: "0 auto 20px", display: "block" }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3>Your cart is empty!</h3>
          <p style={{ marginBottom: "20px" }}>Add items to it now.</p>
          <Link to="/products" style={{ background: "#2874F0", color: "#fff", padding: "12px 32px", borderRadius: "4px", fontWeight: "700", textDecoration: "none", fontSize: "14px" }}>
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.product?._id || item._id} className="cart-item-card">
                <img
                  src={item.product?.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.product?.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.product?.name || "Product Item"}</h4>
                  <span className="cart-item-price">₹{item.product?.price}</span>
                  <div className="cart-item-free-delivery">✓ Free Delivery</div>
                </div>

                <div className="cart-qty-badge">Qty: {item.quantity}</div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.product?._id || item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary-card">
            <div className="summary-title">Price Details</div>

            <div className="price-details-section">
              <div className="price-details-title">Price Details</div>

              <div className="summary-row">
                <span>Price ({totalItems} items)</span>
                <span>₹{Math.round(totalAmount * 1.1)}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span style={{ color: "#388E3C", fontWeight: "700" }}>− ₹{discount}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="free-text">FREE</span>
              </div>

              <div className="summary-row summary-total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="summary-savings">
                You will save ₹{discount} on this order 🎉
              </div>
            </div>

            <form onSubmit={handleCheckout}>
              <div className="shipping-fields">
                <label>
                  Delivery Address
                  <input
                    name="address"
                    placeholder="House No., Street, Area"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    required
                  />
                </label>
                <label>
                  City
                  <input
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Postal Code
                  <input
                    name="postalCode"
                    placeholder="PIN Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Country
                  <input
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    required
                  />
                </label>
              </div>
              <button
                className="checkout-btn"
                type="submit"
                disabled={checkoutLoading || items.length === 0}
              >
                {checkoutLoading ? "Placing Order..." : "Place COD Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;