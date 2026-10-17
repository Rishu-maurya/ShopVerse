import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, Package, Sparkles } from "lucide-react";
import ProductCard from "../components/productCard";
import { setCart } from "../redux/slices/cartSlice";
import { addToCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import { getProductCategories } from "../utils/productUtils";
import "../styles/products.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products || data || []);
      } catch (error) {
        setFeedback({
          type: "error",
          message: error.response?.data?.message || error.message || "Failed to load products",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId);
      dispatch(setCart(data.cart));
      setFeedback({ type: "success", message: "Added to cart" });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.response?.data?.message || error.message || "Please login to add items",
      });
    }
  };

  const categories = getProductCategories(products);
  const featuredProduct = products.find((product) =>
    product.images?.some((image) => typeof image === "string" && image.trim())
  );
  const featuredImage = featuredProduct?.images?.find(
    (image) => typeof image === "string" && image.trim()
  );
  const visibleProducts = products.slice(0, 4);

  return (
    <main className="products-wrapper home-page">
      {feedback && (
        <p className={`page-feedback page-feedback-${feedback.type}`} role="status">
          {feedback.message}
        </p>
      )}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-eyebrow"><Sparkles aria-hidden="true" /> The everyday edit</span>
          <h1>Find your next <span>favourite thing.</span></h1>
          <p>
            The little upgrades, useful essentials, and unexpected finds that
            make your day a bit better.
          </p>
          <div className="home-hero-actions">
            <Link to="/products" className="home-primary-btn">
              Explore the collection <ArrowUpRight aria-hidden="true" />
            </Link>
            {categories[0] && (
              <Link
                to={`/products?category=${encodeURIComponent(categories[0])}`}
                className="home-text-link"
              >
                Browse {categories[0]} <ArrowDownRight aria-hidden="true" />
              </Link>
            )}
          </div>
          {!loading && (
            <div className="home-collection-note">
              <span>{products.length}</span> finds across <span>{categories.length}</span> categories
            </div>
          )}
        </div>

        <div className="home-hero-art" aria-label="Discover products from ShopVerse">
          <div className="home-art-orbit home-art-orbit-one" />
          <div className="home-art-orbit home-art-orbit-two" />
          <div className="home-art-label">
            <span className="home-art-label-dot" />
            A little something for you
          </div>
          {featuredProduct && featuredImage && !heroImageFailed ? (
            <img
              className="home-hero-image"
              src={featuredImage}
              alt="A product from the ShopVerse collection"
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div className="home-hero-placeholder">
              <Package aria-hidden="true" />
            </div>
          )}
          {products.length > 0 && (
            <div className="home-featured-product">
              <div>
                <span>Take a look around</span>
                <strong>The ShopVerse collection</strong>
              </div>
              <span className="home-featured-price">{products.length} finds</span>
            </div>
          )}
          <span className="home-art-index" aria-hidden="true">01 / 01</span>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="home-category-section" aria-labelledby="categories-title">
          <div className="home-section-heading">
            <div>
              <span className="home-section-eyebrow">A good place to start</span>
              <h2 id="categories-title">Browse by category</h2>
            </div>
            <Link to="/products" className="home-section-link">
              See everything <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-category-grid">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="home-category-card"
              >
                <span className="home-category-icon"><Package aria-hidden="true" /></span>
                <span className="home-category-copy">
                  <strong>{category}</strong>
                  <span>
                    {products.filter((product) => product.category?.trim().toLowerCase() === category.toLowerCase()).length} items
                  </span>
                </span>
                <ArrowUpRight className="home-category-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="home-products-section" aria-labelledby="featured-title">
        <div className="home-section-heading">
          <div>
            <span className="home-section-eyebrow">Worth a closer look</span>
            <h2 id="featured-title">A few good finds</h2>
          </div>
          <Link to="/products" className="home-section-link">
            Explore all products <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <div className="loading-state" role="status">
            <div className="loading-spinner" />
            <p>Finding good things...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing to show just yet</h3>
            <p>New products will appear here when they are available.</p>
          </div>
        ) : (
          <div className="product-grid home-product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {!loading && products.length > visibleProducts.length && (
          <div className="home-more-products">
            <Link to="/products" className="home-more-link">
              There&apos;s more to discover <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
