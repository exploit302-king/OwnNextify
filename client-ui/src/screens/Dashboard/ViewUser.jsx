import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import apis from "../../config/apis.jsx";

const ViewUser = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("auth"))?.token;

            const { data } = await axios.get(
                `${apis[0]}/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.ok) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="text-2xl font-semibold dark:text-white">
                    Loading User...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="text-red-600 text-2xl font-bold">
                    User Not Found
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                        User Details
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Complete information about this account
                    </p>

                </div>

                <div className="flex gap-3">

                    <Link
                        to="/dashboard/allusers"
                        className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white duration-300"
                    >
                        ← Back
                    </Link>
                </div>

            </div>

            {/* Top Section */}

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Card */}

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

                    <div className="flex flex-col items-center">

                        <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-52 h-52 rounded-full object-cover border-4 border-[#00C896]"
                        />

                        <h2 className="mt-5 text-3xl font-bold dark:text-white">
                            {user.name || "No Name"}
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400">
                            @{user.name}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 mt-5">

                            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold capitalize">
                                {user.role?.[0]}
                            </span>

                            <span
                                className={`px-4 py-1 rounded-full text-sm font-semibold ${user.isVerified
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user.isVerified ? "Verified" : "Not Verified"}
                            </span>

                            <span
                                className={`px-4 py-1 rounded-full text-sm font-semibold ${user.isBlocked
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {user.isBlocked ? "Blocked" : "Active"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* Right Card */}

                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6 dark:text-white">
                        Personal Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Email */}

                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Email
                            </p>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {user.email || "-"}
                            </h3>
                        </div>

                        {/* Phone */}

                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Phone
                            </p>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {user.phone || "-"}
                            </h3>
                        </div>

                        {/* Age */}

                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Age
                            </p>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {user.age || "-"}
                            </h3>
                        </div>

                        {/* Company */}

                        <div>
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Company
                            </p>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {user.company || "-"}
                            </h3>
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <p className="text-gray-500 dark:text-gray-400 mb-1">
                                Address
                            </p>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {user.address || "-"}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                    Account Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">
                            User ID
                        </p>
                        <h3 className="font-semibold break-all dark:text-white">
                            {user._id}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Username
                        </p>
                        <h3 className="font-semibold dark:text-white">
                            {user.name}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Joined
                        </p>
                        <h3 className="font-semibold dark:text-white">
                            {new Date(user.createdAt).toLocaleString()}
                        </h3>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Last Updated
                        </p>
                        <h3 className="font-semibold dark:text-white">
                            {new Date(user.updatedAt).toLocaleString()}
                        </h3>
                    </div>
                </div>
            </div>
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
                <Link to={`/dashboard/edituser/${user._id}`} className="px-6 py-3 rounded-xl bg-[#00C896] text-white font-semibold hover:bg-[#00b285] duration-300" >
                    EditUser
                </Link>
                <button className={`px-6 py-3 rounded-xl text-white font-semibold duration-300 ${user.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600" }`} >
                    {user.isBlocked ? "Unblock User" : "Block User"}
                </button>

                <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold duration-300" >
                    Delete User
                </button>
            </div>
        </div>
    );
};

export default ViewUser;