import React, { useEffect, useState } from "react";
import axios from "axios";
import apis from "../../config/apis";
import { useAuth } from "../../context/auth";

const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredOrders = orders.filter((order) => {
        const tabMatch =
            activeTab === "All" || order.orderStatus === activeTab;

        const searchMatch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
            order.customer?.email?.toLowerCase().includes(search.toLowerCase());

        const paymentMatch =
            paymentFilter === "" ||
            order.paymentStatus === paymentFilter;

        const statusMatch =
            statusFilter === "" ||
            order.orderStatus === statusFilter;

        return tabMatch && searchMatch && paymentMatch && statusMatch;
    });
    const tabs = [
        "All",
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    const fetchOrders = async () => {
        try {
            const url = auth?.user?.role?.includes("admin")
                ? `${apis[2]}/allorders`
                : `${apis[2]}/seller-orders`;

            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            if (data.ok) {
                setOrders(data.orders);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (auth?.token) {
            fetchOrders();
        }
    }, [auth]);

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by Order ID, Customer..."
                        className="lg:col-span-2 px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Payment */}

                    <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option value="">Payment</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                        <option value="Failed">Failed</option>
                    </select>

                    {/* Fulfillment

                    <select
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option>Fulfillment</option>
                        <option>Unfulfilled</option>
                        <option>Processing</option>
                        <option>Fulfilled</option>
                    </select> */}

                    {/* Delivery */}

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white"
                    >
                        <option value="">Delivery</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                </div>
            </div>
            <p className="mb-4 dark:text-white">
                Total Orders: {orders.length}
            </p>
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
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No Orders Found
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="px-6 py-4 font-semibold dark:text-white">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>

                                    <td className="px-6 py-4 dark:text-gray-300">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold dark:text-white">
                                                {order.customer?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {order.customer?.email}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                            {order.paymentStatus}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                                            {order.orderStatus}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-red-500">
                                        Rs. {order.totalAmount.toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                                            View
                                        </button>
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
export default Orders;