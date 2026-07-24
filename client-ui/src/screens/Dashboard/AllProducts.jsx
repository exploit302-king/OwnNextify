import React, { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../config/apis";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ===============================
    // Fetch Products
    // ===============================
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(apis[1]);

            if (data.ok) {
                setProducts(data.products);
                setFilteredProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ===============================
    // Search Products
    // ===============================
    useEffect(() => {
        if (search === "") {
            setFilteredProducts(products);
        } else {
            const result = products.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                item.brand.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            );

            setFilteredProducts(result);
        }
    }, [search, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold text-green-600">
                    Loading Products...
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        All Products
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Total Products : {filteredProducts.length}
                    </p>

                </div>

                <Link
                    to="/dashboard/addproducts"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
                >
                    + Add Product
                </Link>

            </div>

            {/* Search */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search by title, subtitle, brand or category..."
                    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Empty */}

            {filteredProducts.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <h2 className="text-2xl font-bold text-red-500">
                        No Products Found
                    </h2>

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

                    <table className="min-w-full">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="px-5 py-4 text-left">Image</th>

                                <th className="px-5 py-4 text-left">Title</th>

                                <th className="px-5 py-4 text-left">Brand</th>

                                <th className="px-5 py-4 text-left">Category</th>

                                <th className="px-5 py-4 text-left">Price</th>

                                <th className="px-5 py-4 text-left">Stock</th>

                                <th className="px-5 py-4 text-left">Status</th>

                                <th className="px-5 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredProducts.map((product) => (

                                <tr
                                    key={product._id}
                                    className="border-b hover:bg-gray-100 transition"
                                >

                                    <td className="px-5 py-4">

                                        <img
                                            src={product.image?.[0]}
                                            alt={product.title}
                                            className="w-16 h-16 rounded-lg object-cover border"
                                        />

                                    </td>

                                    <td className="px-5 py-4">

                                        <h2 className="font-bold">
                                            {product.title}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {product.subtitle}
                                        </p>

                                    </td>

                                    <td className="px-5 py-4">
                                        {product.brand}
                                    </td>

                                    <td className="px-5 py-4">
                                        {product.category}
                                    </td>

                                    <td className="px-5 py-4 font-bold text-green-600">
                                        Rs. {product.price}
                                    </td>

                                    <td className="px-5 py-4">
                                        {product.stock}
                                    </td>

                                    <td className="px-5 py-4">

                                        {product.stock > 0 ? (

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                In Stock
                                            </span>

                                        ) : (

                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                                Out Of Stock
                                            </span>

                                        )}

                                    </td>
                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            <Link
                                                to={`/dashboard/viewproduct/${product._id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                to={`/dashboard/edit-product/${product._id}`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm font-semibold"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-semibold"
                                                onClick={() =>
                                                    alert(
                                                        "Delete API will be added in next step."
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

};

export default AllProducts;