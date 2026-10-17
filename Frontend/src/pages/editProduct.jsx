import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";
import "../styles/management.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProductById(id);
        const product = data.product || data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          category: product.category || "",
          stock: product.stock ?? "",
          images: product.images?.join(", ") || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load product",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const images = formData.images
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    try {
      await updateProduct(id, { ...formData, images });
      navigate("/my-products");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to update product",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="management-page edit-product-page">
      <h2>Edit Product</h2>
      <p className="edit-product-intro">Update the details of your listing.</p>

      {error && (
        <p className="page-feedback page-feedback-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="management-empty" role="status">Loading product details...</p>
      ) : (
        <form className="authform edit-product-form" onSubmit={handleSubmit}>
          <div className="management-field">
            <label htmlFor="edit-product-name">Product name</label>
            <input
              id="edit-product-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="management-field">
            <label htmlFor="edit-product-description">Product description</label>
            <textarea
              id="edit-product-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-product-fields-row">
            <div className="management-field">
              <label htmlFor="edit-product-price">Price (₹)</label>
              <input
                id="edit-product-price"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="management-field">
              <label htmlFor="edit-product-stock">Stock</label>
              <input
                id="edit-product-stock"
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="management-field">
            <label htmlFor="edit-product-category">Category</label>
            <input
              id="edit-product-category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="management-field">
            <label htmlFor="edit-product-images">Image URLs</label>
            <input
              id="edit-product-images"
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="Comma-separated image URLs"
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving ? "Saving changes..." : "Save changes"}
          </button>
        </form>
      )}
    </main>
  );
};

export default EditProduct;
