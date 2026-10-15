import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../components/productCard";
import { setCart } from "../redux/slices/cartSlice";
import { addToCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import { getProductCategories } from "../utils/productUtils";
import "../styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    const query = search.trim();

    if (query) {
      nextParams.set("search", query);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (event) => {
    const nextParams = new URLSearchParams(searchParams);

    if (event.target.value) {
      nextParams.set("category", event.target.value);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  };

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId);
      dispatch(setCart(data.cart));
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Please login to add items");
    }
  };

  const categories = getProductCategories(products);
  const category = searchParams.get("category") || "";
  const normalizedSearch = searchParams.get("search")?.trim().toLowerCase() || "";
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(normalizedSearch);
    const matchesCategory = !category || product.category?.trim().toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="products-wrapper">
      <div className="section-heading products-page-heading">
        <div>
          <span className="section-eyebrow">The ShopVerse collection</span>
          <h1>All products</h1>
        </div>

        <form className="products-search-form" onSubmit={handleSearch} role="search">
          <label className="visually-hidden" htmlFor="product-search">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            placeholder="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="products-search-bar"
          />
          <label className="visually-hidden" htmlFor="product-category">
            Filter by category
          </label>
          <select
            id="product-category"
            className="products-category-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </form>
      </div>

      {!loading && (
        <p className="products-result-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      )}

      {loading ? (
        <div className="loading-state" role="status">
          <div className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No matching products</h2>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;
