import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apis from "../../config/apis";
import { successToast, errorToast } from "../../functions/messages";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loader, setLoader] = useState(false);

    const [preview, setPreview] = useState("");

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        stock: "",
    });

    // ==========================
    // Fetch Product
    // ==========================

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`${apis[1]}/${id}`);

            setFormData({
                title: data.title,
                subtitle: data.subtitle,
                brand: data.brand,
                category: data.category,
                description: data.description,
                price: data.price,
                stock: data.stock,
            });

            setPreview(data.image?.[0]);

        } catch (error) {
            console.log(error);
            errorToast("Unable to fetch product");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    // ==========================
    // Input Change
    // ==========================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ==========================
    // Image Change
    // ==========================

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };
    // ==========================
    // Update Product
    // ==========================

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

            if (image) {
                dataToSend.append("image", image);
            }

            const { data } = await axios.put(
                `${apis[1]}/${id}`,
                dataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setLoader(false);

            if (data.ok) {
                successToast(data.message);
                navigate("/dashboard/allproducts");
            } else {
                errorToast(data.message);
            }

        } catch (error) {
            setLoader(false);
            console.log(error);
            errorToast(error.message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-8 px-4">

            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                    Edit Product
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Subtitle
                        </label>

                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                        >
                            <option>Electronics</option>
                            <option>Laptops</option>
                            <option>Mobiles</option>
                            <option>Gaming Console</option>
                            <option>Accessories</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="md:col-span-2">

                        <label className="block font-semibold mb-2 dark:text-white">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />

                    </div>

                    {preview && (

                        <div className="md:col-span-2 flex justify-center">

                            <img
                                src={preview}
                                alt="preview"
                                className="w-56 h-56 object-cover rounded-xl border shadow"
                            />

                        </div>

                    )}

                    <div className="md:col-span-2 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/allproducts")}
                            className="px-6 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                            {loader ? "Updating..." : "Update Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditProduct;