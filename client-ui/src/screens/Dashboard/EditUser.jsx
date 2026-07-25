import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../config/apis.jsx";
// import { useAuth } from '../../context/auth';
import { useAuth } from '../../context/auth.jsx';

const EditUser = () => {
    console.log("useAuth result:", useAuth());

    const { id } = useParams();

    const navigate = useNavigate();

    // const authData = useAuth();
    // const auth = authData[0];
    // const setAuth = authData[1];

    const [ auth, setAuth ] = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        age: "",
        company: "",
        address: "",
        role: "buyer",
        isVerified: false,
        isBlocked: false,
        profileImage: "",
    });

    const token = JSON.parse(localStorage.getItem("auth"))?.token;

    // Fetch User

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(
                `${apis[0]}/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.ok) {
                const user = data.user;

                setFormData({
                    name: user.name || "",
                    username: user.username || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    age: user.age || "",
                    company: user.company || "",
                    address: user.address || "",
                    role: user.role?.[0] || "buyer",
                    isVerified: user.isVerified,
                    isBlocked: user.isBlocked,
                    profileImage: user.profileImage || "",
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Handle Change

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Update User

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         setSaving(true);

    //         const { data } = await axios.put(
    //             `${apis[0]}/update-user/${id}`,
    //             formData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         if (data.ok || data.success) {
    //             navigate("/dashboard/allusers");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     } finally {
    //         setSaving(false);
    //     }
    // };
    //----------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const { data } = await axios.put(
                `${apis[0]}/edituser/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log("Auth Object:", auth);
            console.log("Auth:", auth);
            console.log("Logged User ID:", auth?.user?._id);
            // console.log("Edit User ID:", id);
            // console.log("Logged User ID:", auth?.user?._id);
            // console.log("Updated Data:", data.user);

            if (data.ok) {

                // Current logged-in user update
                if (auth?.user?._id === id) {

                    const updatedAuth = {
                        ...auth,
                        user: data.user,
                    };

                    setAuth(updatedAuth);

                    localStorage.setItem(
                        "auth",
                        JSON.stringify(updatedAuth)
                    );
                }

                navigate("/dashboard/allusers");
            }

        } catch (err) {
            console.log(err);

        } finally {
            setSaving(false);
        }
    };


    // ---------------------------------------------------------------------
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-2xl dark:text-white">
                    Loading User...
                </h2>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold dark:text-white">
                        Edit User
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Update user information
                    </p>

                </div>

                <Link
                    to="/dashboard/allusers"
                    className="mt-4 md:mt-0 px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 duration-300"
                >
                    ← Back
                </Link>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >

                {/* Profile */}

                <div className="flex flex-col items-center mb-6">

                    <img
                        src={formData.profileImage}
                        alt=""
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#00C896]"
                    />

                    <h2 className="mt-3 text-xl font-bold dark:text-white">
                        {formData.name || "User"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        @{formData.name}
                    </p>

                </div>


                <h2 className="text-xl font-bold mb-4 dark:text-white">
                    Personal Information
                </h2>


                <div className="grid md:grid-cols-2 gap-4">


                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-semibold dark:text-white">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-semibold dark:text-white">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>


                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-semibold dark:text-white">
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>


                    {/* Age */}
                    <div>
                        <label className="block mb-1 font-semibold dark:text-white">
                            Age
                        </label>

                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>


                    {/* Company */}
                    <div>
                        <label className="block mb-1 font-semibold dark:text-white">
                            Company
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />
                    </div>


                    {/* Address */}
                    <div className="md:col-span-2">

                        <label className="block mb-1 font-semibold dark:text-white">
                            Address
                        </label>

                        <textarea
                            rows="3"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                        />

                    </div>


                </div>

                {/* Account Settings */}
                <div>
                    <h2 className="text-2xl font-bold mt-10 mb-6 dark:text-white">
                        Account Settings
                    </h2>
                </div>



                {/* Role */}
                <div className="grid md:grid-cols-2 gap-6">
                    <label className="block mb-2 font-semibold dark:text-white">
                        Role
                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    >
                        <option value="admin">Admin</option>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </div>

                {/* Verified */}

                <div className="flex items-center justify-between border rounded-lg px-5 py-4 dark:border-gray-700">

                    <span className="font-semibold dark:text-white">
                        Verified Account
                    </span>

                    <input
                        type="checkbox"
                        name="isVerified"
                        checked={formData.isVerified}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                </div>

                {/* Block */}

                <div className="flex items-center justify-between border rounded-lg px-5 py-4 dark:border-gray-700">

                    <span className="font-semibold dark:text-white">
                        Block User
                    </span>

                    <input
                        type="checkbox"
                        name="isBlocked"
                        checked={formData.isBlocked}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-3 mt-6">

                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 rounded-xl bg-[#00C896] hover:bg-[#00b285] text-white font-semibold duration-300"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        type="reset"
                        className="px-8 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold duration-300"
                    >
                        Reset
                    </button>

                    <Link
                        to="/dashboard/allusers"
                        className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold duration-300"
                    >
                        Cancel
                    </Link>

                </div >
            </form >
        </div >
    );
};

export default EditUser;