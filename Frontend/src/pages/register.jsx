// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "user", // Default role is set to 'user'
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(formData);
      toast.success(data.message || "Registration Successful! Please Login 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Brand Panel */}
      <div className="auth-brand-panel">
        <h1>Looks like you're new here!</h1>
        <p>Sign up with your details to get started with amazing shopping experience</p>
      </div>

      {/* Right Form Panel */}
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account ✨</h2>
          <p>Join us and start shopping today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min. 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="dealer">Dealer</option>
          </select>

          <p className="auth-terms">
            By continuing, you agree to ShopVerse's{" "}
            <a href="/">Terms of Use</a> and{" "}
            <a href="/">Privacy Policy</a>.
          </p>

          

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Existing User?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;