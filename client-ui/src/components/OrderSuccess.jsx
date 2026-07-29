import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8 text-center">

        <FaCheckCircle className="mx-auto text-7xl text-green-600 mb-5" />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Thank you for your purchase. Your order has been received and is
          being processed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/"
            className="rounded-lg bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/MyOrders"
            className="rounded-lg border border-green-600 px-6 py-3 text-green-600 font-medium hover:bg-green-600 hover:text-white transition"
          >
            View My Orders
          </Link>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;