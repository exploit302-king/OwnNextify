import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import apis from "../../config/apis";
import { useAuth } from "../../context/auth";

const ViewOrder = () => {
    const { id } = useParams();
    const [auth] = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const { data } = await axios.get(
                `${apis[2]}/order/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            if (data.ok) {
                setOrder(data.order);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            fetchOrder();
        }
    }, [auth]);

    if (loading) {
        return (
            <div className="p-8 dark:text-white">
                Loading...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-8 dark:text-white">
                Order not found.
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h1 className="text-3xl font-bold dark:text-white">
                        Order Details
                    </h1>

                    <p className="text-gray-500">
                        #{order._id.slice(-6).toUpperCase()}
                    </p>
                </div>

                <Link
                    to="/dashboard/order"
                    className="bg-gray-700 text-white px-5 py-2 rounded-lg"
                >
                    Back
                </Link>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* Customer */}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Customer
                    </h2>

                    <p className="dark:text-white">
                        <b>Name:</b> {order.customer?.name}
                    </p>

                    <p className="dark:text-white">
                        <b>Email:</b> {order.customer?.email}
                    </p>

                    <p className="dark:text-white">
                        <b>Phone:</b> {order.customer?.phone}
                    </p>

                </div>

                {/* Shipping */}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Shipping
                    </h2>

                    <p className="dark:text-white">
                        {order.shippingAddress}
                    </p>

                    <p className="mt-3 dark:text-white">
                        <b>Status:</b> {order.orderStatus}
                    </p>

                    <p className="dark:text-white">
                        <b>Payment:</b> {order.paymentStatus}
                    </p>

                    <p className="dark:text-white">
                        <b>Tracking:</b>{" "}
                        {order.trackingNumber || "Not Assigned"}
                    </p>

                </div>

            </div>

            {/* Products */}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow mt-8">

                <div className="p-6">

                    <h2 className="text-xl font-bold mb-5 dark:text-white">
                        Products
                    </h2>

                    <div className="space-y-5">

                        {order.products.map((item) => (

                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b pb-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={item.product?.image?.[0]}
                                        alt=""
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                    <div>

                                        <h3 className="font-bold dark:text-white">
                                            {item.product?.title}
                                        </h3>

                                        <p className="text-gray-500">
                                            Qty : {item.quantity}
                                        </p>

                                    </div>

                                </div>

                                <div className="font-bold text-green-600">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Summary */}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow mt-8 p-6">

                <h2 className="text-xl font-bold mb-5 dark:text-white">
                    Summary
                </h2>

                <div className="space-y-2">

                    <p className="dark:text-white">
                        <b>Subtotal :</b> Rs. {order.totalAmount.toLocaleString()}
                    </p>

                    <p className="dark:text-white">
                        <b>Shipping :</b> Rs. {order.shippingCharges}
                    </p>

                    <p className="dark:text-white">
                        <b>Tax :</b> Rs. {order.taxAmount}
                    </p>

                    <p className="dark:text-white">
                        <b>Discount :</b> Rs. {order.discountAmount}
                    </p>

                    <hr />

                    <h3 className="text-2xl font-bold text-green-600">

                        Total :
                        Rs.{" "}
                        {(
                            order.totalAmount +
                            order.shippingCharges +
                            order.taxAmount -
                            order.discountAmount
                        ).toLocaleString()}

                    </h3>

                </div>

            </div>

        </div>
    );
};

export default ViewOrder;