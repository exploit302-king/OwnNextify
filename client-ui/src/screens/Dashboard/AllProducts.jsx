import React, { useEffect, useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../../functions/messages";
import apis from "../../config/apis";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [auth] = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // ===============================
    // Fetch Products
    // ===============================
    const fetchProducts = async () => {
        try {
            setLoading(true);

            const url = auth?.user?.role?.includes("admin")
                ? apis[1]
                : `${apis[1]}/my-products`;

            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

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

    const searchProducts = async (keyword) => {
        try {
            if (keyword.trim() === "") {
                setFilteredProducts(products);
                return;
            }
            const { data } = await axios.get(
                `${apis[1]}/search?keyword=${keyword}`
            );
            if (data.ok) {
                setFilteredProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedProduct(null);
        setShowDeleteModal(false);
    };

    const deleteProduct = async () => {

        if (!selectedProduct) return;

        try {

            const { data } = await axios.delete(
                `${apis[1]}/${selectedProduct._id}`
            );

            if (data.ok) {

                successToast(data.message);

                fetchProducts();

                closeDeleteModal();

            } else {

                errorToast(data.message);

            }

        } catch (error) {

            errorToast(error.message);

        }

    };

    useEffect(() => {
        if (auth?.token) {
            fetchProducts();
        }
    }, [auth]);


    useEffect(() => {
        if (search.trim() === "") {
            setFilteredProducts(products);
        } else {
            const keyword = search.toLowerCase().trim();
            const result = products.filter((item) =>
                item.title?.toLowerCase().startsWith(keyword) ||
                item.subtitle?.toLowerCase().startsWith(keyword) ||
                item.brand?.toLowerCase().startsWith(keyword) ||
                item.category?.toLowerCase().startsWith(keyword)
            );
            setFilteredProducts(result);
        }
    }, [search, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold text-gray-950">
                    Loading Products...
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen dark:text-white dark:bg-gray-700 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold dark:text-white ">
                        All Products
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {search
                            ? `Showing ${filteredProducts.length} result(s) for "${search}"`
                            : `Total Products : ${filteredProducts.length}`}
                    </p>

                </div>

                <Link
                    to="/dashboard/addproducts"
                    className="bg-gray-900 hover:bg-gray-950 text-white px-5 py-2 rounded-lg font-semibold"
                >
                    + Add Product
                </Link>

            </div>

            {/*  search Bar */}
            <div className="relative mb-6">

                <input
                    type="text"
                    placeholder="Search by title, subtitle, brand or category..."
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-green-500 transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Search Icon */}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Clear Button */}

                {search && (

                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 text-xl"
                    >
                        ×
                    </button>

                )}

            </div>

            {/* Empty */}

            {filteredProducts.length === 0 ? (

                <div className="relative mb-6">

                    <input
                        type="text"
                        placeholder="Search by title, subtitle, brand or category..."
                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-green-500 transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Search Icon */}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>

                    {/* Clear Button */}

                    {search && (

                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 text-xl"
                        >
                            ×
                        </button>

                    )}

                </div>

            ) : (

                <div className="overflow-x-auto dark:bg-gray-950 rounded-xl shadow-lg">

                    <table className="min-w-full">

                        <thead className="dark:bg-gray-950 dark:text-white">

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

                                    <td className="px-5 py-4 font-bold text-gray-600">
                                        Rs. {product.price}
                                    </td>

                                    <td className="px-5 py-4">
                                        {product.stock}
                                    </td>

                                    <td className="px-5 py-4">

                                        {product.stock > 0 ? (

                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
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
                                                onClick={() => openDeleteModal(product)

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
            {/* Delete Confirmation Modal */}

            {showDeleteModal && (

                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[90%] max-w-md p-6">

                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Delete Product
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300">

                            Are you sure you want to delete

                            <span className="font-bold text-black dark:text-white">
                                {" "}
                                {selectedProduct?.title}
                            </span>

                            ?

                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={closeDeleteModal}
                                className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={deleteProduct}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}
        </div>
    );
};

export default AllProducts;