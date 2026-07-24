import React, { useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../../functions/messages";
import apis from "../../config/apis"

const AddProducts = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const dataToSend = new FormData();

      dataToSend.append("title", formData.title);
      dataToSend.append("subtitle", formData.subtitle);
      dataToSend.append("brand", formData.brand);
      dataToSend.append("category", formData.category);
      dataToSend.append("description", formData.description);
      dataToSend.append("price", formData.price);
      dataToSend.append("stock", formData.stock);

      if (selectedImage) {
        dataToSend.append("productImage", selectedImage);
      }

      const { data } = await axios.post(
        apis[1],
        dataToSend
      );

      setLoader(false);

      if (data.ok) {

        successToast(data.message);

        setFormData({
          title: "",
          subtitle: "",
          brand: "",
          category: "",
          description: "",
          price: "",
          stock: "",
        });

        setSelectedImage(null);
        setPreview("");

      } else {

        errorToast(data.message);

      }

    } catch (error) {

      setLoader(false);
      errorToast(error.message);

    }
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">Add a New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Product Title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subtitle">
            Subtitle
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subtitle" name="subtitle" type="text" placeholder="Product Subtitle" value={formData.subtitle} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
            Brand
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="brand" name="brand" type="text" placeholder="Brand Name" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Laptops">Laptops</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Gaming Console">Gaming Console</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} rows="3" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
            Product Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
        </div>
        {preview && (
          <div className="mb-4 flex justify-center">

            <img
              src={preview}
              alt="Preview"
              className="w-44 h-44 rounded-lg object-cover border"
            />

          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required />
        </div>

        <div className="mt-8 flex justify-end">
          <button href="/" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition" type="submit" >
            {loader ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
