import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import "../styles/products.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ProductCard = ({ product, onAddToCart }) => {
  const image = product.images?.find((url) => typeof url === "string" && url.trim());
  const [imageUnavailable, setImageUnavailable] = useState(!image);

  useEffect(() => {
    setImageUnavailable(!image);
  }, [image]);

  return (
    <article className="product-card">
      <div className="card-image-box">
        {image && !imageUnavailable ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageUnavailable(true)}
          />
        ) : (
          <Package className="product-image-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="card-content">
        {product.category && <span className="card-category">{product.category}</span>}
        <h3 className="card-title">{product.name}</h3>
        <div className="card-bottom">
          <span className="card-price">{currencyFormatter.format(Number(product.price) || 0)}</span>
          <button
            className="btn-add-cart"
            type="button"
            onClick={() => onAddToCart(product._id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
