// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);
      const { token, ...user } = data;
      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Brand Panel */}
      <div className="auth-brand-panel">
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
      </div>

      {/* Right Form Panel */}
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue shopping</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <p className="auth-terms">
            By continuing, you agree to ShopVerse's{" "}
            <a href="/">Terms of Use</a> and{" "}
            <a href="/">Privacy Policy</a>.
          </p>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <p className="auth-footer">
          New to ShopVerse?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;