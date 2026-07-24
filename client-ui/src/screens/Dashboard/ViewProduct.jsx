import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/actions/productActions";

const ViewProduct = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { id } = useParams();

    const { product } = useSelector(state => state.productSlice);

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);
    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold">
                    Loading Product...
                </h1>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            {/* Heading */}

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Product Details
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400">
                        Dashboard / Products / View Product
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        Back
                    </button>

                    <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="px-5 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                        Edit
                    </Link>

                </div>

            </div>



            <div className="grid lg:grid-cols-2 gap-8">

                {/* LEFT */}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

                    <img
                        src={product.image?.[0]}
                        alt={product.title}
                        className="w-full h-[450px] object-cover rounded-xl border"
                    />

                </div>





                {/* RIGHT */}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                        {product.title}
                    </h1>

                    <h2 className="text-xl text-gray-500 mt-2">
                        {product.subtitle}
                    </h2>



                    <div className="grid grid-cols-2 gap-5 mt-8">

                        <div>
                            <p className="text-gray-500">
                                Brand
                            </p>

                            <h3 className="font-bold text-lg dark:text-white">
                                {product.brand}
                            </h3>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Category
                            </p>

                            <h3 className="font-bold text-lg dark:text-white">
                                {product.category}
                            </h3>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Price
                            </p>

                            <h3 className="font-bold text-2xl text-green-600">
                                Rs. {product.price}
                            </h3>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Stock
                            </p>

                            <h3 className="font-bold text-lg dark:text-white">
                                {product.stock}
                            </h3>
                        </div>

                    </div>




                    {/* Status */}

                    <div className="flex gap-3 mt-8 flex-wrap">

                        <span className={`px-4 py-2 rounded-full text-white ${product.stock > 0 ? "bg-green-600" : "bg-red-600"}`}>
                            {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                        </span>

                        {product.onSale && (
                            <span className="px-4 py-2 rounded-full bg-orange-500 text-white">
                                On Sale
                            </span>
                        )}

                        {product.isProductNew && (
                            <span className="px-4 py-2 rounded-full bg-blue-600 text-white">
                                New Arrival
                            </span>
                        )}

                    </div>




                    {/* Description */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-3 dark:text-white">
                            Description
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 leading-8">
                            {product.description}
                        </p>

                    </div>




                    {/* Product Info */}

                    <div className="mt-10 border-t pt-6">

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>
                                <p className="text-gray-500">
                                    Product ID
                                </p>

                                <p className="font-semibold dark:text-white break-all">
                                    {product._id}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Reviews
                                </p>

                                <p className="font-semibold dark:text-white">
                                    {product.numOfReviews}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Created
                                </p>

                                <p className="font-semibold dark:text-white">
                                    {new Date(product.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Updated
                                </p>

                                <p className="font-semibold dark:text-white">
                                    {new Date(product.updatedAt).toLocaleString()}
                                </p>
                            </div>

                        </div>

                    </div>




                    {/* Buttons */}

                    <div className="flex gap-4 mt-10">

                        <Link
                            to={`/dashboard/edit-product/${product._id}`}
                            className="flex-1 text-center py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
                        >
                            Edit Product
                        </Link>

                        <button
                            className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
                            onClick={() => alert("Delete API Next")}
                        >
                            Delete Product
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default ViewProduct;