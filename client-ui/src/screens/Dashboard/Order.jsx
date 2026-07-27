import React, { useState } from "react";

const Orders = () => {

    const [activeTab, setActiveTab] = useState("All");

    const tabs = [
        "All",
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    return (
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold dark:text-white">
                        Orders
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400">
                        Manage all customer orders
                    </p>
                </div>

            </div>

            {/* Status Tabs */}

            <div className="flex flex-wrap gap-3 mb-6">

                {tabs.map((tab) => (

                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg font-medium transition-all

              ${activeTab === tab
                                ? "bg-green-600 text-white"
                                : "bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            }

            `}
                    >
                        {tab}
                    </button>

                ))}

            </div>

            {/* Search + Filters */}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 mb-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer..."
                        className="lg:col-span-2 px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Payment */}

                    <select
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option>Payment</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Refunded</option>
                        <option>Failed</option>
                    </select>

                    {/* Fulfillment */}

                    <select
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option>Fulfillment</option>
                        <option>Unfulfilled</option>
                        <option>Processing</option>
                        <option>Fulfilled</option>
                    </select>

                    {/* Delivery */}

                    <select
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option>Delivery</option>
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>

                </div>

            </div>

            {/* Orders Table */}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100 dark:bg-gray-900">

                        <tr className="text-left">

                            <th className="px-6 py-4 dark:text-white">Order</th>
                            <th className="px-6 py-4 dark:text-white">Date</th>
                            <th className="px-6 py-4 dark:text-white">Customer</th>
                            <th className="px-6 py-4 dark:text-white">Payment</th>
                            <th className="px-6 py-4 dark:text-white">Status</th>
                            <th className="px-6 py-4 dark:text-white">Total</th>
                            <th className="px-6 py-4 dark:text-white">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">

                            <td className="px-6 py-4 font-semibold dark:text-white">
                                #1001
                            </td>

                            <td className="px-6 py-4 dark:text-gray-300">
                                27 Jul 2026
                            </td>

                            <td className="px-6 py-4">

                                <div>

                                    <p className="font-semibold dark:text-white">
                                        Modud Masood
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        modudmasood143@gmail.com
                                    </p>

                                </div>

                            </td>

                            <td className="px-6 py-4">

                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                    Paid
                                </span>

                            </td>

                            <td className="px-6 py-4">

                                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                                    Pending
                                </span>

                            </td>

                            <td className="px-6 py-4 font-semibold text-red-500">
                                Rs. 8,500
                            </td>

                            <td className="px-6 py-4">

                                <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                                    View
                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Orders;