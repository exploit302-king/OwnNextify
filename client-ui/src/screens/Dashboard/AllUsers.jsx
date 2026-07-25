import React, { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../config/apis.jsx";
import { useAuth } from "../../context/auth.jsx";
import { Link } from "react-router-dom";

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [auth] = useAuth();

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {


            const { data } = await axios.get(
                `${apis[0]}/allusers`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            if (data.ok) {
                setUsers(data.users);
                setFilteredUsers(data.users);
            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Users Management
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage all registered users
                    </p>

                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow px-6 py-4">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Users
                    </p>

                    <h2 className="text-3xl font-bold dark:text-white">
                        {users.length}
                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-96 border rounded-xl px-4 py-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />

            </div>

            {/* Table */}

            <div className="overflow-x-auto rounded-xl shadow">

                <table className="w-full">

                    <thead className="dark:bg-gray-950 dark:text-white">

                        <tr>

                            <th className="px-5 py-4 text-left">Image</th>

                            <th className="px-5 py-4 text-left">Name</th>

                            <th className="px-5 py-4 text-left">Email</th>

                            <th className="px-5 py-4 text-left">Phone</th>

                            <th className="px-5 py-4 text-center">Status</th>

                            <th className="px-5 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-20 dark:bg-gray-900 dark:text-white"
                                >

                                    Loading Users...

                                </td>

                            </tr>

                        ) : (

                            filteredUsers.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-b dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >

                                    <td className="px-5 py-4">

                                        <img
                                            src={user.profileImage}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover border"
                                        />

                                    </td>

                                    <td className="px-5 py-4 dark:text-white">
                                        {user.name}
                                    </td>

                                    <td className="px-5 py-4 dark:text-white">
                                        {user.email}
                                    </td>

                                    <td className="px-5 py-4 dark:text-white">
                                        {user.phone}
                                    </td>

                                    <td className="px-5 py-4 text-center">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${user.isBlocked
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                                }`}
                                        >

                                            {user.isBlocked
                                                ? "Blocked"
                                                : "Active"}

                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            <Link to={`/dashboard/viewuser/${user._id}`} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm" >
                                                View
                                            </Link>

                                            <Link
                                                to={`/dashboard/edituser/${user._id}`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-sm"
                                            >
                                                EditUser
                                            </Link>

                                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm">
                                                Block
                                            </button>

                                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm">
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default AllUsers;