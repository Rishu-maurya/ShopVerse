import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingBag } from "lucide-react";
import { logout } from "../redux/slices/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get("search") || "");
  }, [location.search]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Main navigation">
        <Link to="/" className="nav-logo" aria-label="ShopVerse home">
          <span className="nav-logo-mark"><ShoppingBag aria-hidden="true" /></span>
          <span>ShopVerse</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch} role="search">
          <Search className="nav-search-icon" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search the collection"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="nav-search-btn" type="submit" aria-label="Submit search">
            <Search aria-hidden="true" />
          </button>
        </form>

        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Products</NavLink></li>

          {isAuthenticated && (user?.role === "dealer" || user?.role === "admin") && (
            <>
              <li><NavLink to="/add-product" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Add product</NavLink></li>
              <li><NavLink to="/my-products" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>My products</NavLink></li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li><NavLink to="/orders" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>Orders</NavLink></li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => `cart-badge-container${isActive ? " active" : ""}`} aria-label={`Cart, ${totalQuantity} items`}>
                  <ShoppingBag aria-hidden="true" />
                  <span>Cart</span>
                  {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
                </NavLink>
              </li>
            </>
          )}

          <li>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="nav-btn-logout" type="button">
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-btn-login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
