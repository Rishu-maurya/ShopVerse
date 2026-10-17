import { useEffect, useState } from "react";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import { addToCart } from "../services/cartService";
import { getProductById } from "../services/productService";
import "../styles/product-detail.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      setSelectedImage(0);

      try {
        const data = await getProductById(id);
        setProduct(data.product || data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load product details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    setFeedback(null);
    try {
      const data = await addToCart(product._id);
      dispatch(setCart(data.cart));
      setFeedback({ type: "success", message: "Added to cart successfully" });
    } catch (err) {
      setFeedback({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Please log in to add items",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-state" role="status">
          <span className="loading-spinner" />
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-state">
          <Package aria-hidden="true" />
          <h1>{error ? "Unable to load product" : "Product not found"}</h1>
          {error && <p role="alert">{error}</p>}
          <Link to="/products" className="product-back-link">
            <ArrowLeft aria-hidden="true" /> Back to products
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images?.filter(
    (image) => typeof image === "string" && image.trim(),
  ) || [];

  return (
    <main className="product-detail-page">
      <Link to="/products" className="product-back-link">
        <ArrowLeft aria-hidden="true" /> Back to products
      </Link>

      {feedback && (
        <p className={`page-feedback page-feedback-${feedback.type}`} role="status">
          {feedback.message}
        </p>
      )}

      <section className="product-detail-card">
        <div className="product-gallery">
          <div className="product-main-image">
            {images[selectedImage] ? (
              <img src={images[selectedImage]} alt={product.name} />
            ) : (
              <Package className="product-detail-placeholder" aria-hidden="true" />
            )}
          </div>
          {images.length > 1 && (
            <div className="product-thumbnail-list" aria-label="Product images">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`product-thumbnail${selectedImage === index ? " active" : ""}`}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-info">
          {product.category && (
            <span className="product-detail-category">{product.category}</span>
          )}
          <h1>{product.name}</h1>
          <p className="product-detail-price">
            {currencyFormatter.format(Number(product.price) || 0)}
          </p>
          <p className="product-detail-description">
            {product.description || "A thoughtful find from the ShopVerse collection."}
          </p>
          {product.stock !== undefined && (
            <p className={`product-detail-stock${Number(product.stock) > 0 ? "" : " out-of-stock"}`}>
              {Number(product.stock) > 0
                ? `${product.stock} in stock`
                : "Currently out of stock"}
            </p>
          )}
          <button
            className="product-detail-add-button"
            type="button"
            onClick={handleAddToCart}
            disabled={addingToCart || (product.stock !== undefined && Number(product.stock) <= 0)}
          >
            <ShoppingBag aria-hidden="true" />
            {addingToCart ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
