import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import apis from "../config/apis.jsx";
import { useAuth } from "../context/auth.jsx";
import { successToast, errorToast } from "../functions/messages.jsx";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";


const PaymentConfirmation = ({ selectedPaymentMethod }) => {
  const [auth] = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cartItems = [],
    buyerInfo = {},
    paymentMethod = ""
  } = location.state || {};

  const confirmOrder = async () => {
    try {
      const orderData = {
        customer: auth.user._id,
        products: cartItems.map((item) => ({
          product: item.id,
          quantity: item.qty,
          price: item.price,
        })),
        shippingAddress: buyerInfo.address,
        paymentMethod:
          paymentMethod === "cashOnDelivery"
            ? "Cash on Delivery"
            : paymentMethod,
        paymentStatus:
          paymentMethod === "cashOnDelivery"
            ? "Pending"
            : "Paid",
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.qty,
          0
        ),
      };
      const { data } = await axios.post(
        `${apis[2]}/create-order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );
      console.log(data);
      if (data.ok) {
        successToast(data.message);
        dispatch(resetCart());
        navigate("/OrderSuccess");
      } else {
        errorToast(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="py-8 md:py-16">
        <div className="container mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Confirm Your Order
          </h1>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Payment Confirmation Section */}
            <div className="lg:col-span-8">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Method
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  You have selected:{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {paymentMethod || "Not selected"}
                  </span>
                </p>
              </div>
            </div>

            {/* Order Review Section */}
            <div className="lg:col-span-8 mt-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Review Your Order
                </h2>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.price} x {item.qty}
                    </li>
                  ))}

                  <li className="font-bold">
                    Total :
                    { cartItems.reduce(
                      ( total, item) => total + item.price * item.qty,
                      0
                    )} Rs
                  </li>
                </ul>
              </div>
            </div>

            {/* Address Confirmation */}
            <div className="lg:col-span-8 mt-6">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Address
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {buyerInfo.name}, {buyerInfo.address}, {buyerInfo.phone}
                </p>
                <Link
                  to="/Checkout"
                  className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Edit Address
                </Link>
              </div>
            </div>
          </div>

          {/* Confirm Order Button */}
          <div className="mt-8 text-center">
            <button onClick={confirmOrder} className="w-48 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
              Confirm Order
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/Checkout"
              className="flex w-48 items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Go Back to Payment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentConfirmation;
