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
    image: "",
    stock: "",
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(apis[1], formData);
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
          image: "",
          stock: "",
        });
      } else {
        errorToast(data.message);
      }
    } catch (error) {
      setLoader(false);
      errorToast(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 mt-6">Add a New Product</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6 w-full max-w-md"
        onSubmit={handleSubmit} >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Product Title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subtitle">
            Subtitle
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="subtitle" name="subtitle" type="text" placeholder="Product Subtitle" value={formData.subtitle} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
            Brand
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="brand" name="brand" type="text" placeholder="Brand Name" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} rows="3" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image URL
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" name="image" type="text" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required />
        </div>

        <div className="flex items-center justify-between">
          <button href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
            {loader ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
