import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="py-8 md:py-16">
        <div className="container mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Checkout
          </h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Billing Information */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Billing Details
                  </h2>
                  <form>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={buyerInfo.name}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                          id="name"
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={buyerInfo.email}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={buyerInfo.address}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={buyerInfo.phone}
                          onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-4">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Methods
                </h2>
                <div className="space-y-4">
                  {/* Payment Method Options */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
                      />
                      Credit/Debit Card
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
                      />
                      Website Wallet
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500 dark:focus:ring-green-600"
                      />
                      Bank Transfer
                    </label>
                  </div>
                </div>

                {/* Conditional Forms */}
                <div className="mt-6">
                  {paymentMethod === "creditCard" && (
                    <form>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </form>
                  )}
                  {paymentMethod === "wallet" && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pay using your website wallet balance.
                    </p>
                  )}
                  {paymentMethod === "cashOnDelivery" && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You will pay upon receiving the product.
                    </p>
                  )}
                  {paymentMethod === "bankTransfer" && (
                    <form>
                      <label
                        htmlFor="bankDetails"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Bank Account Details
                      </label>
                      <textarea
                        id="bankDetails"
                        rows="3"
                        className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      ></textarea>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <div className="mt-8 text-center">
            <button disabled={!paymentMethod} onClick={() => navigate("/Confirmation", { state: { cartItems, buyerInfo, paymentMethod } }) }
              disabled={!paymentMethod}
              className={`w-full rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 ${paymentMethod
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
            >
              {paymentMethod ? "Proceed to Payment" : "Select a Payment Method"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/CartPage"
              className="flex w-32 items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
