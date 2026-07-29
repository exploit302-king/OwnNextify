import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
import apis from "../config/apis";

const MyOrders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`${apis[2]}/my-orders`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            if (data.ok) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            fetchOrders();
        }
    }, [auth]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
                        <h2 className="text-xl font-semibold dark:text-white">
                            No Orders Found
                        </h2>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                            >
                                <div className="grid md:grid-cols-2 gap-4">

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Order ID
                                        </p>
                                        <p className="text-gray-500 break-all">
                                            {order._id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Order Date
                                        </p>
                                        <p className="text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Total
                                        </p>
                                        <p className="text-gray-500">
                                            {order.totalAmount} Rs
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Payment
                                        </p>
                                        <p className="text-gray-500">
                                            {order.paymentStatus}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Order Status
                                        </p>
                                        <p className="text-gray-500">
                                            {order.orderStatus}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-semibold dark:text-white">
                                            Payment Method
                                        </p>
                                        <p className="text-gray-500">
                                            {order.paymentMethod}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyOrders;