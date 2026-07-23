import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchProduct = async () => {
    if (!keyword.trim()) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/search?keyword=${keyword}`
      );

      if (data.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">

      {/* Search Bar */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search Product..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchProduct()}
          className="flex-1 border rounded-lg px-4 py-3 outline-none"
        />

        <button
          onClick={searchProduct}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && (
        <h2 className="text-center text-xl">Loading...</h2>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl shadow p-4"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full object-cover rounded-lg"
              />
            </Link>

            <h2 className="font-bold text-xl mt-3">
              {product.title}
            </h2>

            <p className="text-gray-500">
              {product.category}
            </p>

            <h3 className="text-red-600 font-bold text-lg">
              Rs. {product.price}
            </h3>

            <Link
              to={`/product/${product._id}`}
              className="block mt-3 bg-black text-white text-center py-2 rounded-lg"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;