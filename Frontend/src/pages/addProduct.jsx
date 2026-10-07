import { useState } from "react";
import { toast } from "react-toastify";
import { createProduct} from "../services/productService"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: "",
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imagesArray = formData.images
      .split(",")
      .map((url) => url.trim());

    try {
      const data = await createProduct({
        ...formData,
        images: imagesArray,
      });

      toast.success(data.message || "Product added successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Faild to add product",
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <form className="authform" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
          ></input>

          <label>Product Description</label>
          <textarea
            name="description"
            placeholder="Enter Product Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label>Product Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter Product Price"
            value={formData.price}
            onChange={handleChange}
          ></input>

          <label>Product Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter Product Category"
            value={formData.category}
            onChange={handleChange}
          ></input>

          <label>Avilable Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Enter Avilable Stock"
            value={formData.stock}
            onChange={handleChange}
          ></input>

          <label>Product Images</label>
          <input
            type="text"
            name="images"
            placeholder="Add Product Image"
            value={formData.images}
            onChange={handleChange}
          ></input>

          <button type="submit">Add Product</button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
