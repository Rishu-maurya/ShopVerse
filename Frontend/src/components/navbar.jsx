// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          ShopVerse
          <span>Explore Plus</span>
        </Link>

        {/* Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            readOnly
          />
          <button className="nav-search-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </button>
        </div>

        {/* Nav Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>

          {isAuthenticated && (
            <>
            {(user?.role === "dealer" || user?.role === "admin") && (
              <li>
                <Link to="/add-product" className="nav-link">
                  Add Product
                </Link>
              </li>
            )}

            {(user?.role === "dealer" || user?.role === "admin") && (
              <li>
                <Link to="/my-product" className="nav-link">
                  My Products
                </Link>
              </li>
            )}


              <li>
                <Link to="/orders" className="nav-link">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="cart-badge-container">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Cart
                  {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                  )}
                </Link>
              </li>
            </>
          )}

          {isAuthenticated ? (
            <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="nav-user-greeting">
                Hi, {user?.fullName?.split(" ")[0] || user?.name || "User"}
              </span>
              <button onClick={handleLogout} className="nav-btn-logout">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-btn-login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
