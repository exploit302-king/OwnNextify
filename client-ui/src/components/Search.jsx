import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import apis from "../config/apis";

const Search = () => {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const keyword = searchParams.get("keyword") || "";

    const fetchSearchProducts = async () => {

        if (!keyword.trim()) {

            setProducts([]);

            setLoading(false);

            return;

        }

        try {

            setLoading(true);

            const { data } = await axios.get(
                `${apis[1]}/search?keyword=${keyword}`
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

    useEffect(() => {

        fetchSearchProducts();

    }, [keyword]);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-2">
                Search Results
            </h1>

            <p className="text-gray-500 mb-8">

                Showing results for

                <span className="font-semibold">
                    {" "} "{keyword}"
                </span>

            </p>

            {

                products.length === 0 ?

                    (

                        <div className="text-center py-20">

                            <h2 className="text-2xl font-bold text-red-500">

                                No Products Found

                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {

                                products.map((product) => (

                                    <div
                                        key={product._id}
                                        className="border rounded-xl shadow-lg p-4 hover:shadow-xl transition"
                                    >

                                        <Link to={`/product/${product._id}`}>

                                            <img
                                                src={
                                                    Array.isArray(product.image)
                                                        ? product.image[0]
                                                        : product.image
                                                }
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

                                        <h3 className="text-green-600 font-bold text-lg">

                                            Rs. {product.price}

                                        </h3>

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="block mt-3 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800"
                                        >

                                            View Details

                                        </Link>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default Search;