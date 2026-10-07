import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyProducts, deleteProduct } from "../services/productService";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products || data || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          " Failed to load your products",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product")) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete product",
      );
    }
  };

  return (
  <>
  <div>
    <h2>My Product</h2>

    {loading ? (
      <p>Loading your products...</p>
    ) : products.length === 0 ? (
      <p>You haven't added any productyet.</p>
    ) : (
      <div>
        {products.map((item) => (
          <div key = { item._id } >
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>Stock: {item.stock}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    )
    }
  </div>
  </>
)
}

export default MyProducts;
